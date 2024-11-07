import {
  getHeaderParams,
  getResponseMessage,
} from "../OKXData/getHeaderParams";
import { baseUrl } from "../index";

export async function getWalletBalance(walletAddress: string, chain: string) {
  try {
    const endPoints = `/api/v5/wallet/asset/all-token-balances-by-address?address=${walletAddress}&chains=${chain}&filter=1`;
    const header = getHeaderParams(endPoints, "GET");
    const url = baseUrl + endPoints;
    const response = await getResponseMessage(url, "GET", header);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
