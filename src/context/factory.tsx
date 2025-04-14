/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BRIDGEASSISTS } from "@/lib/constants";
import { ChainId } from "@/lib/types";
import { createContext, useContext, useState } from "react";
// import { Factory__factory } from "../contracts/types";
// import { getChainRpc } from "../utils/node";
// import { JsonRpcProvider } from "ethers";

export interface BridgeAssistAndToken {
  bridgeAssist: string;
  token: string;
}

export type ChainBridgeAssists = {
  [key in ChainId]: BridgeAssistAndToken[];
};

interface FactoryState {
  bridgeAssists: ChainBridgeAssists;
  loading: boolean;
//   setBridgeAssists: (_bridgeAssists: ChainBridgeAssists) => void;
//   setLoading: (loading: boolean) => void;
}

const FactoryContext = createContext<FactoryState | null>(null);

export const useFactory = () => {
  const context = useContext(FactoryContext);
  if (!context) {
    throw new Error("useFactory must be used within a FactoryProvider");
  }
  return context;
};

export const FactoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bridgeAssists, setBridgeAssists] = useState<ChainBridgeAssists>(
    BRIDGEASSISTS as any
  );
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => { loadBridgeAssists()}, []);

  // async function loadBridgeAssists() {
  //   setIsLoading(true);
  //   const _bridgeAssists: any = {};
  //   try {
  //     await Promise.all(
  //       chainIds.map(async (chainId) => {
  //         const contractAddress = factoryAddresses[chainId];
  //         if (!contractAddress) {
  //           _bridgeAssists[chainId] = [];
  //           return;
  //         }
  //         const rpc = getChainRpc(chainId);
  //         const contract = Factory__factory.connect(
  //           contractAddress,
  //           new JsonRpcProvider(rpc)
  //         );
  //         const assistsLength = await contract.getCreatedBridgesLength();
  //         if (assistsLength <= BigInt(0)) {
  //           _bridgeAssists[chainId] = [];
  //           return;
  //         }
  //         const assists = await contract.getCreatedBridgesInfo(
  //           0,
  //           assistsLength
  //         );
  //         _bridgeAssists[chainId] = [...assists];
  //       })
  //     );
  //     console.log(_bridgeAssists, 'djdkdj')
  //     setBridgeAssists(_bridgeAssists)
  //     setIsLoading(false)
  //   } catch (error: any) {
  //       console.log(`${error.message}`)
  //   }
  // }

  return (
    <FactoryContext.Provider
      value={{
        bridgeAssists,
        loading: isLoading,
        // setBridgeAssists,
        // setLoading: setIsLoading,
      }}
    >
      {children}
    </FactoryContext.Provider>
  );
};
