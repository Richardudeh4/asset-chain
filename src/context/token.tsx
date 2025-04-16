/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Token__factory } from "../contracts/types";
import { JsonRpcProvider } from "ethers";
import { BridgeAssistAndToken, useFactory } from "./factory";
import { useWallet } from "./web3";
import { ContractTransactionResponse } from "ethers";
import { ChainId, Token } from "@/lib/types";
import { chains, DEFAULT_NATIVE_TOKEN_CONTRACT, defaultChainId } from "@/lib/constants";
import { getChainRpc } from "@/lib/node";

export interface TokenDetails {
  value: string;
  symbol: string;
  disabled: boolean;
  chainAddress: {
    [key in string]: string;
  };
}

type TokenBalance = {
  [key in ChainId]: { bridgeAssist: bigint; user: bigint; symbol: string }[];
};
export type TokenDecimal = {
  [key in ChainId]: { symbol: string; decimal: bigint }[];
};

type ChainToken = {
  [key in ChainId]: TokenDetails[];
};

interface TokenState {
  selectedToken: Token | null;
  loading: boolean;
  tokens: TokenDetails[];
  allTokens: ChainToken;
  balances: TokenBalance;
  decimals: TokenDecimal;
  loadingBalances: boolean;
  awaitingTransaction: boolean;
  getTokens: (chainIds: string[]) => Promise<void>;
  setSelectedToken: (selectedToken: Token | null) => void;
  hasAllowance: (_chainId: ChainId, amount: bigint) => Promise<boolean>;
  getBalances: (chainIds: ChainId[]) => Promise<void>;
  approve: (
    _chainId: ChainId,
    amount: bigint,
  ) => Promise<ContractTransactionResponse | null>;

  //   setBridgeAssists: (_bridgeAssists: ChainBridgeAssists) => void;
  //   setLoading: (loading: boolean) => void;
}

const TokenContext = createContext<TokenState | null>(null);

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a FactoryProvider");
  }
  return context;
};

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<TokenDetails[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [balances, setBalances] = useState<TokenBalance>({} as TokenBalance);
  const [decimals, setDecimals] = useState<TokenDecimal>({} as TokenDecimal);
  const [allTokens, setAllTokens] = useState<ChainToken>({} as ChainToken);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingBalances, setloadingBalances] = useState(false);
  const [awaitingTransaction, setAwaitingTransaction] = useState(false);

  const { bridgeAssists } = useFactory();
  const { address, signer } = useWallet();

  useEffect(() => {
    getTokens();
  }, [bridgeAssists]);

  useEffect(() => {
    getBalances();
  }, [address]);

  async function getTokens() {
    try {
      setIsLoading(true);
      const _tokens: TokenDetails[] = [];
      const _balances = {} as TokenBalance;
      const _decimals = {} as TokenDecimal;
      const _allTokens = { ...allTokens };
      // const chains : string[] = []
      // _chainIds.forEach(c => {
      //   if (!allTokens[c as ChainId] || allTokens[c as ChainId].length <= 0) chains.push(c)
      // })
      // Object.keys(allTokens)
      //   .filter((c) => chains.map.includes(c))
      //   .forEach((c) => {
      //     _tokens = _tokens.concat(allTokens[c as ChainId]);
      //   });
      if (_tokens.length > 0) {
        setIsLoading(false);
        setTokens(_tokens);
      } else {
        if (!bridgeAssists) return;

        await Promise.all(
          chains.map(async (c) => {
            const chainId = c.chainId;
            const tokens = await _getTokens(chainId, bridgeAssists[chainId]);
            _balances[chainId] = [];
            _decimals[chainId] = [];
            tokens.forEach((t) => {
              _balances[chainId].push({
                user: t.userBalance,
                bridgeAssist: t.bridgeAssistBalance,
                symbol: t.token.symbol,
              });
              _decimals[chainId].push({
                decimal: t.decimal,
                symbol: t.token.symbol,
              });

              if (!_allTokens[chainId]) _allTokens[chainId] = [];
              _allTokens[chainId].push(t.token);
              const token = _tokens.find((_t) => _t.symbol === t.token.symbol);
              if (!token) _tokens.push(t.token);
            });
          })
        );
        const bal = { ...balances, ..._balances };
        const dec = { ...decimals, ..._decimals };


        setDecimals(dec);
        setBalances(bal);
        setAllTokens(_allTokens);
        setTokens(_tokens);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  }

  async function _getTokens(
    chainId: ChainId,
    bridgeAssists: BridgeAssistAndToken[]
  ) {
    return await Promise.all(bridgeAssists.map((b) => getToken(chainId, b)));
  }

  async function getToken(
    chainId: ChainId,
    bridgeAssist: BridgeAssistAndToken
  ) {
    let userBalance = BigInt(0);
    let bridgeAssistBalance = BigInt(0);
    let symbol = chainId === defaultChainId ? "RWA" : "BTC";
    let value = symbol;
    let decimal = BigInt(18);
    const tokenAddress = bridgeAssist.token;
    const provider = new JsonRpcProvider(getChainRpc(chainId));
    if (bridgeAssist.token === DEFAULT_NATIVE_TOKEN_CONTRACT) {
      if (address) {
        userBalance = await provider.getBalance(address);
      }
      bridgeAssistBalance = await provider.getBalance(
        bridgeAssist.bridgeAssist
      );
    } else {
      // console.log(chainId, 'chainId')
      // console.log(chainId, 'chainId')
      const contract = Token__factory.connect(tokenAddress, provider);
      if (address) {
        userBalance = await contract.balanceOf(address);
      }
      bridgeAssistBalance = await contract.balanceOf(bridgeAssist.bridgeAssist);
      symbol = await contract.symbol();
      decimal = await contract.decimals();
      symbol = symbol === "USD₮0" ? "USDT" : symbol;
      value = symbol
    }
    const token: TokenDetails = {
      disabled: false,
      symbol,
      value,
      chainAddress: { [chainId]: tokenAddress },
    };
    return {
      userBalance,
      bridgeAssistBalance,
      token,
      decimal,
    };
  }

  async function getBalances(_chains?: ChainId[]) {
    const _balances = { ...balances };
    if (!bridgeAssists) return;
    const realChains = _chains ? _chains : chains.map((c) => c.chainId);
    setloadingBalances(true);
    try {
      await Promise.all(
        realChains.map(async (c) => {
          const bridge = bridgeAssists[c];
          if (!bridge) return;
          const balances = await _getBalances(c, bridge);
          _balances[c] = [...balances];
        })
      );
      setBalances(_balances);
      setloadingBalances(false);
    } catch (error: any) {
      setloadingBalances(false);
    }
  }

  async function _getBalances(
    chainId: ChainId,
    bridgeAssists: BridgeAssistAndToken[]
  ) {
    return await Promise.all(bridgeAssists.map((b) => getBalance(chainId, b)));
  }

  async function getBalance(
    chainId: ChainId,
    bridgeAssist: BridgeAssistAndToken
  ) {
    let userBalance = BigInt(0);
    let bridgeAssistBalance = BigInt(0);
    let symbol = chainId === defaultChainId ? "RWA" : "BTC";
    const tokenAddress = bridgeAssist.token;
    const provider = new JsonRpcProvider(getChainRpc(chainId));
    if (bridgeAssist.token === DEFAULT_NATIVE_TOKEN_CONTRACT) {
      if (address) {
        userBalance = await provider.getBalance(address);
      }
      bridgeAssistBalance = await provider.getBalance(
        bridgeAssist.bridgeAssist
      );
    } else {
      // console.log(chainId, 'chainId')
      // console.log(chainId, 'chainId')
      const contract = Token__factory.connect(tokenAddress, provider);
      if (address) {
        userBalance = await contract.balanceOf(address);
      }
      bridgeAssistBalance = await contract.balanceOf(bridgeAssist.bridgeAssist);
      symbol = await contract.symbol();
      symbol = symbol === "USD₮0" ? "USDT" : symbol;
    }
    return {
      bridgeAssist: bridgeAssistBalance,
      user: userBalance,
      symbol,
    };
  }

  async function hasAllowance(_chainId: ChainId, amount: bigint) {
    try {
      if (!address) return false;
      if (!selectedToken) return false;
      if (!amount) return false;
      if (!allTokens) return false;
      if (!bridgeAssists) return false;
      const _bridgeAssists = bridgeAssists[_chainId];
      if (!_bridgeAssists) return false;
      const chainTokens = allTokens[_chainId];
      if (!chainTokens) return false;
      const _amount = Number(amount);
      if (Number.isNaN(_amount)) return false;
      const symbol = selectedToken.value
      // if (symbol === 'USDC' && !isProd) symbol = `aUSDC.e`
      const token = chainTokens.find((t) => t.symbol === symbol);
      if (!token) return false;
      const tokenAddress = token.chainAddress[_chainId];
      if (!tokenAddress) return false;
      if (tokenAddress === DEFAULT_NATIVE_TOKEN_CONTRACT) return true;
      const bridgeAssist = _bridgeAssists.find((b) => b.token === tokenAddress);
      if (!bridgeAssist) return false;

      const contract = Token__factory.connect(
        tokenAddress,
        new JsonRpcProvider(getChainRpc(_chainId))
      );
      const allowance = await contract.allowance(
        address,
        bridgeAssist.bridgeAssist
      );

      console.log(allowance, amount, 'user')

      if (allowance >= amount) return true;

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function approve(
    _chainId: ChainId,
    amount: bigint,
  ): Promise<ContractTransactionResponse | null> {
    try {
      if (!amount) return null;
      if (!bridgeAssists) return null;
      if (!selectedToken) return null
      const _bridgeAssists = bridgeAssists[_chainId];
      if (!_bridgeAssists) return null;
      const _amount = Number(amount);
      if (Number.isNaN(_amount)) return null;
      const chainTokens = allTokens[_chainId];
      if (!chainTokens) return null;
      const symbol = selectedToken.value
      const token = chainTokens.find((t) => t.symbol === symbol);
      if (!token) return null;
      const tokenAddress = token.chainAddress[_chainId]
      if (tokenAddress === DEFAULT_NATIVE_TOKEN_CONTRACT) return null;
      const bridgeAssist = _bridgeAssists.find((b) => b.token === tokenAddress);
      if (!bridgeAssist) return null;

      if (!signer) return null;
      setAwaitingTransaction(true)
      const contract = Token__factory.connect(tokenAddress, signer);
      // const { token } = useContracts(undefined, chainId)
      const tx = await contract.approve(bridgeAssist.bridgeAssist, amount);

      await tx.wait(1);
      console.log(tx);
      setAwaitingTransaction(false)
      return tx;
    } catch (error) {
      setAwaitingTransaction(false)
      throw error;
    }
  }

  return (
    <TokenContext.Provider
      value={{
        allTokens,
        balances,
        decimals,
        getTokens,
        loading: isLoading,
        selectedToken,
        tokens,
        setSelectedToken,
        loadingBalances,
        hasAllowance,
        approve,
        awaitingTransaction,
        getBalances
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
