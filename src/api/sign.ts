import { _request } from "@/lib/helpers";
import { ChainId, SignatureResponse } from "@/lib/types";


export async function retrieveSignatures(
  fromBridgeAddress: string,
  toBridgeAssistAddress: string,
  fromChain: ChainId,
  fromUser: string,
<<<<<<< HEAD
  index: number
=======
  index: number,
  symbol: string
>>>>>>> 85f09553a3855b289747c06aa470977f8f2c0014
) {
  const queryParams = {
    fromBridgeAddress,
    toBridgeAssistAddress,
    fromChain,
    fromUser,
    index,
  };
<<<<<<< HEAD
  const res  = await _request<undefined, SignatureResponse >("/sign", "GET", undefined, queryParams);
=======
  const res  = await _request<undefined, SignatureResponse >(symbol, "/sign", "GET", undefined, queryParams);
>>>>>>> 85f09553a3855b289747c06aa470977f8f2c0014

  return res.signature
}
