import { AbiCoder, keccak256 } from "ethers";
import { chainsTokensConnection } from "./constants";
import { baseUrl } from "@/config/env-var";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractError(error: any) {
  let title = ``;
  let body = ``;

  if (error.shortMessage) title = error.shortMessage;
  if (error.info && error.info.error && error.info.error.message)
    body = error.info.error.message;
  if (error.data && error.data.message)
    body = error.data.message;

  title = title ? title : error.message;
  body = body ? body : error.message;

  return {
    title,
    body,
  };
}

export const extractTransaction = (tx: any) => {
  return {
    amount: tx.amount as bigint,
    timestamp: tx.timestamp.toString() as string,
    fromUser: tx.fromUser as string,
    toUser: tx.toUser as string,
    fromChain: tx.fromChain.toString() as string,
    toChain: tx.toChain.toString() as string,
    nonce: tx.nonce.toString() as string,
  };
};

export const extractFulfillTransaction = (tx: any) => {
  return {
    amount: tx.amount.toString(),
    fromChain: tx.fromChain.toString(),
    nonce: Number(tx.nonce.toString()),
    fromUser: tx.fromUser.toString(),
    toUser: tx.toUser.toString(),
  };
};

export const packTx = (tx: any) => {
  return AbiCoder.defaultAbiCoder().encode(
    ["uint", "uint", "address", "string", "string", "string", "uint"],
    [
      tx.amount,
      tx.timestamp,
      tx.fromUser,
      tx.toUser,
      tx.fromChain,
      tx.toChain,
      tx.nonce,
    ]
  );
};

export const hashTx = (tx: any) => keccak256(packTx(tx));

export function findTokenByChains(
  a: string,
  b: string,
  data = chainsTokensConnection
) {
  const foundItem = data.find((item) => {
    const chains = item.chains;
    return chains.includes(a) && chains.includes(b);
  });

  return foundItem ? foundItem.tokens : undefined;
}

export async function _request<B, R>(
  _url: string,
  method?: string,
  body?: B,
  searchParams?: any
) {
  try {
    const url = new URL(`${baseUrl}${_url}`);
    if (searchParams) {
      Object.keys(searchParams).forEach((k) => {
        url.searchParams.set(k, searchParams[k]);
      });
    }

    console.info(`Url: ${url.toString()}`);
    console.log(`Body`, body);
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: body ? JSON.stringify({ ...body }) : undefined,
    });
    if (!res.ok) throw new Error(`${await res.text()}`);
    const resData: R = await res.json();
    return resData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
