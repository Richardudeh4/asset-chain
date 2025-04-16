import { JsonRpcProvider } from "ethers";

export type ChainId =
  | "1"
  | "42420"
  | "56"
  | "137"
  | "42161"
  | "8453"
  | "200901"
  | "56"
  | "97"
  | "80001"
  | "421611"
  | "42421"
  | "421614"
  | "84532"
  | "80002"
  | "11155111"
  | "200901"
  | "200810";

export type Chain = {
  chainId: ChainId;
  label: string;
};

export type Token = {
  value: string;
  label: string;
};

export type ISigner = JsonRpcProvider | null;

<<<<<<< HEAD
export type FulfillInfo = { txBlock: number; confirmations: number }
=======
export type FulfillInfo = { txBlock: number; confirmations: number };
>>>>>>> 85f09553a3855b289747c06aa470977f8f2c0014

export type Connection<Key, Value> = {
  chains: [Key, Key];
  tokens: Value[];
};

export type ConnectionMap<Key, Value> = Connection<Key, Value>[];

<<<<<<< HEAD
export type SignatureData = string[] | string

export type SignatureResponse = {
  signature: SignatureData
}

=======
export type SignatureData = string[] | string;

export type SignatureResponse = {
  signature: SignatureData;
};

export type BridgeData = {
  amount: string;
  fromChain: ChainId;
  toChain: ChainId;
  token: string;
  tokenIsNative: boolean;
  fromUser: string;
};

export enum BridgeAction {
  APPROVE = "approve",
  TRANSFER = "transfer",
  CLAIM = "claim",
  CLOSE = "close",
  SWITCH_CHAIN = 'switch-chain'
}
>>>>>>> 85f09553a3855b289747c06aa470977f8f2c0014
