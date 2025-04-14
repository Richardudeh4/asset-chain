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

export type FulfillInfo = { txBlock: number; confirmations: number }

export type Connection<Key, Value> = {
  chains: [Key, Key];
  tokens: Value[];
};

export type ConnectionMap<Key, Value> = Connection<Key, Value>[];

export type SignatureData = string[] | string

export type SignatureResponse = {
  signature: SignatureData
}

