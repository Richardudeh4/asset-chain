import { JsonRpcSigner } from "ethers";
import { JsonRpcProvider } from "ethers";
import { BridgeAssist__factory, Factory__factory, Token__factory } from "./types";
import { ChainId } from "@/lib/types";
import { getChainRpc } from "@/lib/node";

export function anyBridgeAssist(chainId: ChainId, address: string, signer? : JsonRpcSigner){
    const provider = new JsonRpcProvider(getChainRpc(chainId))

    return BridgeAssist__factory.connect(address, signer ? signer : provider)
}

export function anyToken(chainId: ChainId, address: string, signer? : JsonRpcSigner){
    const provider = new JsonRpcProvider(getChainRpc(chainId))

    return Token__factory.connect(address, signer ? signer : provider)
}

export function anyFactory(chainId: ChainId, address: string, signer? : JsonRpcSigner){
    const provider = new JsonRpcProvider(getChainRpc(chainId))

    return Factory__factory.connect(address, signer ? signer : provider)
}
