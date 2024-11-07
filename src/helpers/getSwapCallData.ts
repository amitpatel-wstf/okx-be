import { baseUrl } from "..";
import { getHeaderParams } from "../OKXData/getHeaderParams";

export async function getSwapTransactionData(
  chainId: string,
  amount: string,
  fromTokenAddress: string,
  toTokenAddress: string,
  slippage: string,
  walletAddress: string,
) {
  try {
    const apiEndPoints = `/api/v5/dex/aggregator/swap?chainId=${chainId}&amount=${amount}&fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&slippage=${slippage}&userWalletAddress=${walletAddress}`;
    const header = getHeaderParams(apiEndPoints, "GET");
    // const response = await getResponseMessage(baseUrl+apiEndPoints,"GET",header);
    const r1 = await fetch(baseUrl + apiEndPoints, {
      headers: header,
      method: "GET",
    });
    const result = await r1.json();
    console.log("Reponse :", result);
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}