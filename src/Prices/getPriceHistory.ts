import { baseUrl } from "..";
import { getHeaderParams } from "../OKXData/getHeaderParams";

export async function getPriceHistory() {
  try {
    const endPoints = `/api/v5/wallet/token/historical-price?chainIndex=8453&tokenAddress=0x4200000000000000000000000000000000000006&limit=5&period=1m`;
    const header = getHeaderParams(endPoints, "GET");
    const response = await fetch(baseUrl + endPoints, { headers: header });
    const result = await response.json();
    console.log("Result : ", result);
    console.log("Result : ", result.data[0].prices);
  } catch (error: any) {
    console.log(
      "Error while gettting the price history of the token on the perticuler chain..",
    );
  }
}
