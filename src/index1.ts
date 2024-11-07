import CryptoJS from "crypto-js";

export async function API_GET_CALL() {
  try {
    const timestamp = new Date().toISOString();

    const sign = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(
        timestamp +
          "GET" +
          "/api/v5/dex/cross-chain/build-tx?fromChainId=59144&toChainId=137&fromTokenAddress=0x5fbdf89403270a1846f5ae7d113a989f850d1566&toTokenAddress=0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270&amount=1&slippage=0.05&userWalletAddress=0x95f77139DccEE50ed5E428ECE9aAF4832C326387",
        process.env.SIGN || "",
      ),
    );

    const request = await fetch(
      "https://www.okx.com/api/v5/dex/cross-chain/build-tx?fromChainId=59144&toChainId=137&fromTokenAddress=0x5fbdf89403270a1846f5ae7d113a989f850d1566&toTokenAddress=0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270&amount=1&slippage=0.05&userWalletAddress=0x95f77139DccEE50ed5E428ECE9aAF4832C326387",
      // "https://www.okx.com/api/v5/dex/cross-chain/build-tx?fromChainId=59144&toChainId=",
      {
        headers: {
          "OK-ACCESS-PROJECT": process.env.PROJECT_ID || "",
          "OK-ACCESS-KEY": process.env.ACCESS_KEY || "",
          "OK-ACCESS-TIMESTAMP": timestamp,
          "OK-ACCESS-SIGN": sign,
          "OK-ACCESS-PASSPHRASE": process.env.PASSPHRASE || "",
          "Content-Type": "application/json",
        },
        // body:{chains:["1","2"],address:"0xf4d2888d29d722226fafa5d9b24f9164c092421e"}
      },
    );
    // console.log("response : ", request);
    const result = await request.json();
    console.log("Result : ", result);
    // console.log("TokenAddests : ", result.data[0].tokenAssets);
  } catch (error) {
    console.log("error : ", error);
  }
}
// API_GET_CALL();
// getSwapSupportedChain();
// getSupportedTokenOnChain()
// getUserAssets();
// getSupportedToken()
// getSwapTransaction()
// crossChainSwap()
// getTokenPrice();