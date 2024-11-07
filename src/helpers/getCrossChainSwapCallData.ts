import { baseUrl } from "..";
import { getHeaderParams } from "../OKXData/getHeaderParams";

export async function getCrossChainSwapCallData(
  fromChainId: string,
  fromTokenAddress: string,
  amount: string,
  toChainId: string,
  toTokenAddress: string,
  userWalletAddress: string,
) {
  try {
    console.log(
      fromChainId,
      toChainId,
      fromTokenAddress,
      toTokenAddress,
      amount,
      userWalletAddress,
    );
    const apiEndPoints = `/api/v5/dex/cross-chain/build-tx?fromChainId=${fromChainId}&toChainId=${toChainId}&fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}&slippage=0.05&userWalletAddress=${userWalletAddress}`;
    const header = getHeaderParams(apiEndPoints, "GET");
    const response = await fetch(baseUrl + apiEndPoints, {
      headers: header,
    });
    const data = await response.json();
    console.log("Data :: ", data);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
