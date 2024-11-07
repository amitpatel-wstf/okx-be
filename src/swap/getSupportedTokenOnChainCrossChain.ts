import { baseUrl } from "..";
import { getHeaderParams } from "../OKXData/getHeaderParams";

export async function getSupportedTokenOnCrossChain() {
  try {
    const endPoints = `/api/v5/dex/cross-chain/supported/tokens?chainId=${59144}`;
    const header = getHeaderParams(endPoints, "GET");
    const response = await fetch(baseUrl + endPoints, {
      headers: header,
    });
    // console.log("Response : ", response);
    const result = await response.json();
    console.log("Result : ", result);
  } catch (error: any) {
    console.log("Error while getting supported token : ", error);
  }
}

// fromToken - 0x4200000000000000000000000000000000000006
// toToken - 0xa219439258ca9da29e9cc4ce5596924745e12b93
