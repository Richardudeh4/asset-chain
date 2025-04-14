/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-refresh/only-export-components */
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { JsonRpcProvider, JsonRpcSigner } from "ethers";
import { WalletType } from "@/lib/wallet";
import { ChainId } from "@/lib/types";
import { WalletHandler } from "@/lib/wallet/wallet-handler";
import { chainIds, chains, defaultChainId, WALLET_STORAGE_KEY } from "@/lib/constants";
import { Metamask } from "@/lib/wallet/metamask";
import { Walletconnect } from "@/lib/wallet/wallet-connect";
import { getChainRpc } from "@/lib/node";
// import { Walletconnect } from '../utils/wallet/wallet-connect';

interface WalletConnectionState {
  walletType: WalletType;
  address: string;
  chainId: string;
  signer: JsonRpcSigner;
}

export type ChainBlock =  {
  [key in ChainId]: number
}
interface WalletContextType {
  walletHandler: WalletHandler | null;
  connect: (walletType: WalletType) => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: ChainId) => Promise<void>;
  checkChain: (chainId: ChainId) => Promise<void>;
  isConnected: boolean;
  address: string | null;
  chainId: ChainId | null;
  signer: JsonRpcSigner | null,
  walletType: WalletType,
  currentBlocks: ChainBlock
}



const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

const UPDATE_TIME = 20000

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletHandler, setWalletHandler] = useState<WalletHandler | null>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<ChainId | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [walletType, setWalletType] = useState<WalletType>('metamask');
  const [currentBlocks, setCurrentBlocks] = useState<ChainBlock>({} as ChainBlock);

  useEffect(() => {
    const savedState = localStorage.getItem(WALLET_STORAGE_KEY);
    if (savedState) {
      const { walletType, address, chainId } = JSON.parse(
        savedState
      ) as WalletConnectionState;
      connect(walletType, address, chainId);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(()=> {
      getCurrentBlock()
    }, UPDATE_TIME)
    return () => {
      clearInterval(timer)
    }
  }, [])

  function updateStore(
    signer: JsonRpcSigner | null,
    wallet: string | null,
    chainId: string | null,
    walletType: WalletType,
    login?: boolean,
  ) {
    const _chain = chainId ? chainId.toString() : null;
    setIsConnected(login ? login : false);
    setAddress(wallet);
    setChainId(_chain as ChainId);
    setSigner(signer);
    setWalletType(walletType)

    localStorage.setItem(
      WALLET_STORAGE_KEY,
      JSON.stringify({
        walletType: walletType,
        address: wallet,
        chainId,
      })
    );
  }

  const connect = async (
    walletType: WalletType,
    savedAddress?: string,
    savedChainId?: string
  ) => {
    let handler: WalletHandler | null = null;

    switch (walletType) {
      case "metamask":
        handler = new Metamask(chainIds, defaultChainId, updateStore);
        break;
      case "walletconnect":
        handler = new Walletconnect(chainIds, defaultChainId, updateStore);
        break;
      // Add other wallet types here
      default:
        throw new Error("Unsupported wallet type");
    }

    if (handler) {
      const success = await handler.connect();
      if (success) {
        setWalletHandler(handler);

        localStorage.setItem(
          WALLET_STORAGE_KEY,
          JSON.stringify({
            walletType,
            address: savedAddress || handler.address,
            chainId: savedChainId || handler.chainId?.toString(),
          })
        );
      }
    }
  };

  const disconnect = async () => {
    if (walletHandler) {
      await walletHandler.disconnect();
      setWalletHandler(null);
      setIsConnected(false);
      setAddress(null);
      setChainId(null);

      localStorage.removeItem(WALLET_STORAGE_KEY);
    }
  };

  const switchChain = async (chainId: ChainId) => {
    if (walletHandler) {
      await walletHandler.switchChain(chainId);
      setChainId(walletHandler.chainId);
    }
  };

  async function checkChain(_chainId : ChainId) {
    try {
      if (!chainId) switchChain(_chainId)
      if (chainId !== _chainId) await switchChain(_chainId)
    } catch (error) {
      console.error(error);
    }
  }

   async function getCurrentBlock () {
    const _currentBlock = {...currentBlocks}

    await Promise.all(chains.map( async c => {
      const provider = new JsonRpcProvider(getChainRpc(c.chainId))

      const block = await provider.getBlockNumber()
      _currentBlock[c.chainId] = block
    }))

    setCurrentBlocks(_currentBlock)
  }


  return (
    <WalletContext.Provider
      value={{
        walletHandler,
        connect,
        disconnect,
        switchChain,
        isConnected,
        address,
        chainId: chainId ? (chainId.toString() as ChainId) : null,
        signer,
        walletType,
        checkChain,
        currentBlocks
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
