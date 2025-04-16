/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { BridgeAssist__factory, Token__factory } from "../contracts/types";
import { JsonRpcProvider, ContractTransactionResponse } from "ethers";
import { useToken } from "./token";
import { useWallet } from "./web3";
import { useFactory } from "./factory";
import { anyBridgeAssist } from "../contracts/useContract";
import { BridgeAssistGenericUpgradeable } from "../contracts/types/BridgeAssist";
import { ChainId } from "@/lib/types";
import { extractFulfillTransaction } from "@/lib/helpers";
import {
  chains,
  CONFIRMATIONS,
  DEFAULT_NATIVE_TOKEN_CONTRACT,
  defaultChainId,
} from "@/lib/constants";
import { getChainRpc } from "@/lib/node";
import { retrieveSignatures } from "@/api/sign";

export interface BridgeAssistAndToken {
  bridgeAssist: string;
  token: string;
}

export interface BridgeFees {
  feeFull: bigint;
  feeSend: bigint;
  limitPerSend: bigint;
}

export interface BridgeTrasaction {
  amount: bigint;
  timestamp: bigint;
  fromUser: string;
  toUser: string;
  fromChain: ChainId;
  toChain: ChainId;
  nonce: number;
  symbol: string;
}

export type TokenBridgeFees = {
  [key in string]: BridgeFees;
};

export type ChainTokenBridgeFees = {
  [key in string]: TokenBridgeFees;
};

// type RealTokenSupportedChain = {
//   [key in string]: Chain[];
// };

export type FulfilTransaction = {
  amount: string;
  fromChain: string;
  nonce: number;
  fromUser: string;
  toUser: string;
};

type ClaimInfo = {
  txBlock: bigint;
  confirmations: number;
};

export interface SignedTransaction {
  transaction: BridgeTrasaction;
  fulfillTransaction: FulfilTransaction;
  fulfilled: boolean;
  claimInfo: ClaimInfo;
  symbol: string;
  index: number;
}

export interface ChainBridgeTrasaction {
  signedTransactions: SignedTransaction[];
  totalTransactions: number;
}

export type ChainSignedTransaction = {
  [key in string]: ChainBridgeTrasaction;
};

interface BridgeState {
  // supportedChains: RealTokenSupportedChain;
  loadingTransactions: boolean;
  bridgesFees: ChainTokenBridgeFees;
  signedTransactions: ChainSignedTransaction;
  bridgeAwaitingTransaction: boolean;
  getSignedTransactions: (chains?: ChainId[]) => Promise<void>;
  send: (
    amount: bigint,
    from: ChainId,
    to: ChainId
  ) => Promise<ContractTransactionResponse | null>;
  fulfill: (
    transaction: FulfilTransaction,
    to: ChainId,
    symbol: string,
    index: number
  ) => Promise<ContractTransactionResponse | null>;
  //   setBridgeAssists: (_bridgeAssists: ChainBridgeAssists) => void;
  //   setLoading: (loading: boolean) => void;
}

const BridgeContext = createContext<BridgeState | null>(null);

export const useBridge = () => {
  const context = useContext(BridgeContext);
  if (!context) {
    throw new Error("useBridge must be used within a BridgeProvider");
  }
  return context;
};

function getSignedTx(t: any, symbol: string, index: number, fulfillInfo?: any) {
  return {
    transaction: {
      amount: t.amount,
      timestamp: t.timestamp,
      fromUser: t.fromUser,
      toUser: t.toUser,
      fromChain: t.fromChain.replace("evm.", "") as ChainId,
      toChain: t.toChain.replace("evm.", "") as ChainId,
      nonce: Number(t.nonce),
      symbol: symbol,
    },
    fulfillTransaction: extractFulfillTransaction(t),
    fulfilled: fulfillInfo ? fulfillInfo.isFulfilled : false,
    claimInfo: {
      txBlock: fulfillInfo ? fulfillInfo.txBlock : 0,
      confirmations: fulfillInfo ? fulfillInfo.confirmations : 0,
    },
    symbol: symbol,
    index,
  };
}

export const BridgeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [supportedChains, setSupportedChains] =
  //   useState<RealTokenSupportedChain>({});
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [bridgeAwaitingTransaction, setBridgeAwaitingTransaction] =
    useState(false);
  const [signedTransactions, setSignedTransactions] =
    useState<ChainSignedTransaction>({});
  const [bridgesFees, setBridgesFees] = useState<ChainTokenBridgeFees>({});

  const { allTokens, selectedToken } = useToken();
  const { address, signer } = useWallet();
  const { bridgeAssists } = useFactory();

  // useEffect(() => {
  //   loadSupportedChains();
  // }, [allTokens, bridgeAssists, selectedToken, tokenSuppotedChains, chainId]);

  useEffect(() => {
    getFees();
  }, [bridgeAssists]);

  useEffect(() => {
    getTransactions();
  }, [address, bridgeAssists, selectedToken]);

  // async function loadSupportedChains() {
  //   if (!allTokens) return;
  //   const _supportedChains = { ...supportedChains };
  //   let _token = selectedToken;
  //   if (!_token) {
  //     if (!chainId || !allTokens[chainId]) return;
  //     _token = allTokens[chainId][0];
  //   }
  //   if (
  //     _supportedChains[_token.symbol] &&
  //     _supportedChains[_token.symbol].length > 0
  //   )
  //     return;
  //   if (!tokenSuppotedChains) return;
  //   if (!bridgeAssists) return;
  //   const chainIds = tokenSuppotedChains[_token.symbol];
  //   if (!chainIds) return;
  //   try {
  //     setLoadingChains(true);
  //     await Promise.all(
  //       chainIds.map(async (c) => {
  //         const token = allTokens[c].find((t) => t.symbol === _token.symbol);
  //         if (!token) return;
  //         const bridgeAssist = bridgeAssists[c].find(
  //           (b) => b.token === token.chainAddress[c]
  //         );
  //         if (!bridgeAssist) return;
  //         const contract = BridgeAssist__factory.connect(
  //           bridgeAssist.bridgeAssist,
  //           new JsonRpcProvider(getChainRpc(c))
  //         );
  //         const listBytes = await contract.supportedChainList();
  //         const d = listBytes.map((l) =>
  //           toUtf8String(l).replace(/\0/g, "").replace("evm.", "")
  //         );
  //         _supportedChains[_token.symbol] = [...new Set([...d, c])].map(
  //           (c) => chains.find((ch) => ch.chainId === c)!
  //         );
  //       })
  //     );
  //     setLoadingChains(false);
  //     setSupportedChains(_supportedChains);
  //   } catch (error: any) {
  //     console.log(`${error.message}`);
  //     setLoadingChains(false);
  //   }
  // }

  async function getFees() {
    if (!bridgeAssists) return;
    try {
      const _bridgesFees = {} as ChainTokenBridgeFees;
      await Promise.all(
        chains.map(async (c) => {
          const chainId = c.chainId;
          const _brigdeAssists = bridgeAssists[chainId];
          if (!_brigdeAssists) return;
          const fees = await _getBridgeFees(chainId, _brigdeAssists);
          fees.forEach((f) => {
            if (!_bridgesFees[chainId]) _bridgesFees[chainId] = {};
            _bridgesFees[chainId][f.symbol] = {
              feeFull: f.feeFull,
              feeSend: f.feeSend,
              limitPerSend: f.limitPerSend,
            };
          });
        })
      );
      setBridgesFees(_bridgesFees);
    } catch (error: any) {
      console.error(`Fees Error ${error.message}`);
    }
  }

  async function _getBridgeFees(
    chainId: ChainId,
    bridgeAssists: BridgeAssistAndToken[]
  ) {
    return await Promise.all(
      bridgeAssists.map((b) => getBridgeFees(chainId, b))
    );
  }

  async function getBridgeFees(
    chainId: ChainId,
    bridgeAssist: BridgeAssistAndToken
  ) {
    let feeFull = BigInt(0);
    let feeSend = BigInt(0);
    let limitPerSend = BigInt(0);
    let symbol = chainId === defaultChainId ? "RWA" : "BTC";

    const provider = new JsonRpcProvider(getChainRpc(chainId));

    const contract = BridgeAssist__factory.connect(
      bridgeAssist.bridgeAssist,
      provider
    );
    if (bridgeAssist.token !== DEFAULT_NATIVE_TOKEN_CONTRACT) {
      const tokenContract = Token__factory.connect(
        bridgeAssist.token,
        provider
      );
      symbol = await tokenContract.symbol();
      // symbol = symbol === "aUSDC.e" ? "USDC" : symbol;
    }

    const feeFullPromise = contract.feeFulfill();
    const feeSendPromise = contract.feeSend();
    const limitPerSendPromise = contract.limitPerSend();

    const res = await Promise.all([
      feeFullPromise,
      feeSendPromise,
      limitPerSendPromise,
    ]);
    feeFull = res[0];
    feeSend = res[1];
    limitPerSend = res[2];

    return {
      feeFull,
      feeSend,
      limitPerSend,
      symbol,
    };
  }

  async function getTransactions(_chains?: ChainId[]) {
    const transactions = {} as ChainSignedTransaction;
    if (!selectedToken) return;
    if (!address) return;
    if (!bridgeAssists) return;
    const realChains = _chains
      ? _chains.map((c) => ({ chainId: c, label: "" }))
      : chains;
    try {
      setLoadingTransactions(true);
      await Promise.all(
        realChains.map(async (chain) => {
          const chainId = chain.chainId;
          const _bridgeAssists = bridgeAssists[chain.chainId];
          if (!_bridgeAssists) return;
          const tokens = allTokens[chainId];
          if (!tokens) return;
          const symbol = selectedToken.value;
          const token = tokens.find((t) => t.symbol === symbol);
          if (!token) return;
          const bridgeAssist = _bridgeAssists.find(
            (b) => b.token === token.chainAddress[chainId]
          );
          if (!bridgeAssist) return;

          const provider = new JsonRpcProvider(getChainRpc(chainId));

          const contract = BridgeAssist__factory.connect(
            bridgeAssist.bridgeAssist,
            provider
          );
          let _transactions: BridgeAssistGenericUpgradeable.TransactionStructOutput[] =
            [];
          const transactionLength = await contract.getUserTransactionsAmount(
            address
          );
          const _transactionLength = Number(transactionLength);
          if (_transactionLength > 0) {
            _transactions = await contract.getUserTransactions(address);
          }
          const signedTx = await Promise.all(
            _transactions.map(async (t, i) => {
              // const hashedTx = hashTx(t)
              const toChainId = t.toChain.replace("evm.", "") as ChainId;
              const toBridgeAssists = bridgeAssists[toChainId];
              if (!toBridgeAssists)
                return getSignedTx(t, selectedToken.value, i);

              let toTokens = allTokens[toChainId];
              if (!tokens) return getSignedTx(t, selectedToken.value, i);
              if (!toTokens) toTokens = [];
              const toToken = toTokens.find(
                (t) => t.symbol === selectedToken.value
              );
              if (!toToken) return getSignedTx(t, selectedToken.value, i);
              const toBridgeAssist = toBridgeAssists.find(
                (b) => b.token === toToken.chainAddress[toChainId]
              );
              if (!toBridgeAssist)
                return getSignedTx(t, selectedToken.value, i);

              const fulfillInfo = await fulfilledInfo(
                t,
                toBridgeAssist.bridgeAssist
              );

              return getSignedTx(t, selectedToken.value, i, fulfillInfo);
            })
          );

          transactions[chainId] = {
            totalTransactions: Number(transactionLength),
            signedTransactions: [...signedTx],
          };
        })
      );
      setSignedTransactions(transactions);
      setLoadingTransactions(false);
    } catch (error: any) {
      console.log(error);
      setLoadingTransactions(false);
    }
  }

  async function fulfilledInfo(tx: any, bridgeAddress: string) {
    const chainId = tx.toChain.replace("evm.", "") as ChainId;

    let fulfilledAt = BigInt(0);

    const contract = anyBridgeAssist(chainId, bridgeAddress);

    fulfilledAt = await contract.fulfilledAt(
      tx.fromChain,
      tx.fromUser,
      tx.nonce
    );

    return {
      isFulfilled: Number(fulfilledAt) > 0,
      txBlock: tx.block as bigint,
      confirmations: CONFIRMATIONS[
        tx.fromChain.replace("evm.", "") as ChainId
      ] as number,
    };
  }

  async function send(amount: bigint, from: ChainId, to: ChainId) {
    try {
      console.log("djdjdjj");
      if (!selectedToken) return null;
      if (!signer) return null;
      if (!address) return null;
      if (!amount) return null;
      if (!allTokens) return null;
      if (!bridgeAssists) return null;
      const _bridgeAssists = bridgeAssists[from];
      if (!_bridgeAssists) return null;
      const chainTokens = allTokens[from];
      if (!chainTokens) return null;

      console.log(amount, "dkdjdj");

      const symbol = selectedToken.value;
      // if (symbol === 'USDC' && !isProd) symbol = `aUSDC.e`
      const token = chainTokens.find((t) => t.symbol === symbol);
      if (!token) return null;
      const tokenAddress = token.chainAddress[from];
      if (!tokenAddress) return null;
      const bridgeAssist = _bridgeAssists.find((b) => b.token === tokenAddress);
      if (!bridgeAssist) return null;

      if (bridgeAssist.token === DEFAULT_NATIVE_TOKEN_CONTRACT) {
        const contract = anyBridgeAssist(
          from,
          bridgeAssist.bridgeAssist,
          signer
        );
        setBridgeAwaitingTransaction(true);
        const tx = await contract.send(amount, address, `evm.${to}`, {
          value: amount,
        });

        await tx.wait(1);
        setBridgeAwaitingTransaction(false);
        return tx;
      } else {
        const contract = anyBridgeAssist(
          from,
          bridgeAssist.bridgeAssist,
          signer
        );
        setBridgeAwaitingTransaction(true);
        const tx = await contract.send(amount, address, `evm.${to}`);

        await tx.wait(1);
        setBridgeAwaitingTransaction(false);
        return tx;
      }
    } catch (error) {
      setBridgeAwaitingTransaction(false);
      throw error;
    }
  }

  async function fulfill(
    transaction: FulfilTransaction,
    to: ChainId,
    symbol: string,
    index: number
  ) {
    try {
      to = to.replace("evm.", "") as ChainId;
      const from = transaction.fromChain.replace("evm.", "") as ChainId;
      if (!signer) return null;
      if (!allTokens) return null;
      if (!bridgeAssists) return null;
      const _frombridgeAssists = bridgeAssists[from];
      if (!_frombridgeAssists) return null;

      const _toBridgeAssists = bridgeAssists[to];
      if (!_toBridgeAssists) return null;

      const toChainTokens = allTokens[to];
      if (!toChainTokens) return null;

      const fromChainTokens = allTokens[from];

      if (!fromChainTokens) return null;

      // if (symbol === 'USDC' && !isProd) symbol = `aUSDC.e`
      const toToken = toChainTokens.find((t) => t.symbol === symbol);
      if (!toToken) return null;

      const fromToken = fromChainTokens.find((t) => t.symbol === symbol);
      if (!fromToken) return null;

      const toTokenAddress = toToken.chainAddress[to];
      if (!toTokenAddress) return null;

      const fromTokenAddress = fromToken.chainAddress[from];
      if (!fromTokenAddress) return null;
      const toBridgeAssist = _toBridgeAssists.find(
        (b) => b.token === toTokenAddress
      );
      if (!toBridgeAssist) return null;

      const fromBridgeAssist = _frombridgeAssists.find(
        (b) => b.token === fromTokenAddress
      );
      if (!fromBridgeAssist) return null;

      setBridgeAwaitingTransaction(true);

      const signature = await retrieveSignatures(
        fromBridgeAssist.bridgeAssist,
        toBridgeAssist.bridgeAssist,
        transaction.fromChain as ChainId,
        transaction.fromUser,
        index,
        symbol
      );
      let _signatures = [];
      if (!signature) throw new Error("Signature Error: Something went wrong");
      if (typeof signature === "string") {
        _signatures = [signature];
      } else {
        _signatures = [...signature];
      }
      const contract = anyBridgeAssist(to, toBridgeAssist.bridgeAssist, signer);
      const tx = await contract.fulfill(transaction, _signatures);

      await tx.wait();

      setBridgeAwaitingTransaction(false);

      return tx;
    } catch (error) {
      setBridgeAwaitingTransaction(false);
      throw error;
    }
  }

  return (
    <BridgeContext.Provider
      value={{
        // supportedChains,
        bridgeAwaitingTransaction,
        bridgesFees,
        loadingTransactions,
        signedTransactions,
        getSignedTransactions: getTransactions,
        send,
        fulfill,
        // setBridgeAssists,
        // setLoading: setIsLoading,
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
};
