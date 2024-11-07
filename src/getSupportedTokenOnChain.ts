// https://www.okx.com/api/v5/dex/aggregator/supported/chain
import CryptoJS from "crypto-js";
export async function getSwapSupportedChain() {
  try {
    const timestamp = new Date().toISOString();

    const sign = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(
        timestamp +
          "GET" +
          "/api/v5/dex/aggregator/supported/chain?chains=59144",
        "3A4193E92078633B376FB4937899E4A2",
      ),
    );

    const request = await fetch(
      "https://www.okx.com/api/v5/dex/aggregator/supported/chain?chains=8453",
      // "https://www.okx.com/api/v5/dex/cross-chain/build-tx?fromChainId=59144&toChainId=",
      {
        headers: {
          "OK-ACCESS-PROJECT": "eef86aba59d93b4a8a90480e49d5d63b",
          "OK-ACCESS-KEY": "07e956d1-664e-4fcb-b918-e980d9184729",
          "OK-ACCESS-TIMESTAMP": timestamp,
          "OK-ACCESS-SIGN": sign,
          "OK-ACCESS-PASSPHRASE": "Amit@1234",
          "Content-Type": "application/json",
        },
        // body:{chains:["1","2"],address:"0xf4d2888d29d722226fafa5d9b24f9164c092421e"}
      },
    );
    // console.log("response : ", request);
    const result = await request.json();
    console.log("Result : ", result);
    console.log("TokenAddests : ", result.data[0].tokenAssets);
  } catch (error) {
    console.log("error : ", error);
  }
}
