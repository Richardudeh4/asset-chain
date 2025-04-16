import { _request } from "@/lib/helpers";
import { ChainId, SignatureResponse } from "@/lib/types";


export async function retrieveSignatures(
  fromBridgeAddress: string,
  toBridgeAssistAddress: string,
  fromChain: ChainId,
  fromUser: string,
  index: number,
  symbol: string
) {
  const queryParams = {
    fromBridgeAddress,
    toBridgeAssistAddress,
    fromChain,
    fromUser,
    index,
  };
  const res  = await _request<undefined, SignatureResponse >(symbol, "/sign", "GET", undefined, queryParams);

  return res.signature
}
