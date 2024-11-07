import CryptoJS from "crypto-js";
import { TransactionExecute } from "../TransactionExecute";

export async function crossChainSwap() {
  try {
    const amount = 4546000000000000; //0.00001*10**18;
    const timestamp = new Date().toISOString();
    const userWalletAddress = "0x95f77139DccEE50ed5E428ECE9aAF4832C326387";

    const apiEndPoints = `/api/v5/dex/cross-chain/build-tx?fromChainId=${8453}&toChainId=${59144}&fromTokenAddress=${"0x4200000000000000000000000000000000000006"}&toTokenAddress=${"0xa219439258ca9da29e9cc4ce5596924745e12b93"}&amount=${amount}&slippage=0.05&userWalletAddress=${userWalletAddress}`;
    console.log("api end Points:::...........", apiEndPoints);
    const sign = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(
        timestamp + "GET" + apiEndPoints,
        "3A4193E92078633B376FB4937899E4A2",
      ),
    );

    const request = await fetch("https://www.okx.com" + apiEndPoints, {
      headers: {
        "OK-ACCESS-PROJECT": "eef86aba59d93b4a8a90480e49d5d63b",
        "OK-ACCESS-KEY": "07e956d1-664e-4fcb-b918-e980d9184729",
        "OK-ACCESS-TIMESTAMP": timestamp,
        "OK-ACCESS-SIGN": sign,
        "OK-ACCESS-PASSPHRASE": "Amit@1234",
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    console.log("Swap Result : inside cross Chain swap.............", data);
    // if (!swapData || swapData.length === 0 || !swapData[0].tx) {
    //     throw new Error("Invalid swap data received");
    // }
    // await TransactionExecute(data.data[0].tx)
  } catch (error) {
    console.log("Error..... ", error);
  }
}

// fromToken - 0x4200000000000000000000000000000000000006
// toToken - 0xa219439258ca9da29e9cc4ce5596924745e12b93
