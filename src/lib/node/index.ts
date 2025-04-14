import { ChainId } from "../types";
import {
  ChainTag,
  chainTags,
  realChainIds,
  realNames,
  realSymbols,
  scanners,
  universalRpc,
} from "./misc";

export interface Node {
  short: string;
  name: string;
  scanner: string;
  rpc: string;
  chainId: number;
}

export interface Config {
  name: string;
  rpc: string;
  chainId: number;
  symbol: string;
  scanner: string;
}

const rpc = universalRpc();

export function node(name: ChainTag): Node {
  // console.log(name, 'name')

  if (name === "localhost") {
    return {
      rpc: "http://127.0.0.1:8545/",
      chainId: realChainIds[name],
      scanner: scanners[name],
      name: realNames[name],
      short: name,
    };
  }
  if (Object.keys(realNames).includes(name)) {
    return {
      rpc: rpc(name),
      chainId: realChainIds[name],
      scanner: scanners[name] ?? "",
      name: realNames[name],
      short: name,
    };
  }

  return {} as Node;
}

export function getConfig(name: ChainTag): Config {
  if (Object.keys(realNames).includes(name)) {
    return {
      name: realNames[name],
      rpc: rpc(name),
      chainId: realChainIds[name],
      symbol: realSymbols[name],
      scanner: scanners[name] ?? "",
    };
  }

  return {} as Config;
}

export function getChainTag(chainId: ChainId): ChainTag {
  if (!chainTags[chainId as unknown as keyof typeof chainTags])
    return "localhost";

  return chainTags[chainId as unknown as keyof typeof chainTags] as ChainTag;
}

export function getChainRpc(chainId: ChainId): string {
  return node(getChainTag(chainId)).rpc;
}

export function getChainName(chainId: ChainId): string {
  return node(getChainTag(chainId)).name;
}

export function getChainHex(chainId: ChainId): string {
  return "0x" + node(getChainTag(chainId)).chainId.toString(16);
}

export function getChainScanner(chainId: ChainId): string {
  return node(getChainTag(chainId)).scanner;
}

export function getChainDescription(chainId: ChainId) {
  return getConfig(getChainTag(chainId));
}
