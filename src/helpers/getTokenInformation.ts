import { getHeaderParams } from "../OKXData/getHeaderParams";
import { baseUrl } from "../index";

export async function getTokenInformation(tokenAddress: string) {
  try {
    const apiEndPoint = `/api/v5/defi/explore/token/list?tokenAddress=${tokenAddress}&chainId=8453`;
    const header = getHeaderParams(apiEndPoint, "GET");
    const r1 = await fetch(baseUrl + apiEndPoint, {
      headers: header,
      method: "GET",
    });
    const result = await r1.json();
    console.log("Result : ", result.data[0].tokenInfos);
    return result;
  } catch (error: any) {
    console.log("Error while getting token information by OKX ");
    throw new Error(error.message);
  }
}
