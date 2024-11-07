import CryptoJS from "crypto-js";
import { getHeaderParams } from "../OKXData/getHeaderParams";
import { baseUrl } from "..";

export async function getTokenPrice() {
  try {
    const endPoint = `/api/v5/wallet/token/current-price?chainIndex=8453&tokenAddress=0x4200000000000000000000000000000000000006`;
    const header = getHeaderParams(endPoint,"POST")
    const response = await fetch(baseUrl+endPoint, {
      method: "POST",
      headers: header,
      body:JSON.stringify({chainIndex:"8453",tokenAddress:"0x4200000000000000000000000000000000000006"})
    });
    const result = await response.json()
    console.log("response: ", result);
  } catch (error) {
    console.log("Error : ", error);
  }
}
