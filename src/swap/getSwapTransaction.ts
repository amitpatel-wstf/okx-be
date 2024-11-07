// 0x5fbdf89403270a1846f5ae7d113a989f850d1566
// https://www.okx.com/api/v5/dex/aggregator/all-tokens

import CryptoJS from "crypto-js";  
import Web3 from "web3";
const ethers = require("ethers");

export async function getSwapTransaction() {
  try {
    const amount = 10//0.00001*10**18;
    const timestamp = new Date().toISOString();
    const userWalletAddress = "0x95f77139DccEE50ed5E428ECE9aAF4832C326387"
    // const apiEndPoints = "/api/v5/dex/aggregator/swap?chainId=59144&amount="+amount+"&fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x5FBDF89403270a1846F5ae7D113A989F850d1566&slippage=0.05&userWalletAddress="+userWalletAddress
    const apiEndPoints = "/api/v5/dex/aggregator/swap?chainId=59144&amount=10000000000000&fromTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&toTokenAddress=0x5fbdf89403270a1846f5ae7d113a989f850d1566&slippage=0.05&userWalletAddress=0x95f77139DccEE50ed5E428ECE9aAF4832C326387"
    const sign = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(
        timestamp +
          "GET" +
        apiEndPoints,
        "3A4193E92078633B376FB4937899E4A2",
      ),
    );

    const request = await fetch(
      "https://www.okx.com"+apiEndPoints,
      {
        headers: {
          "OK-ACCESS-PROJECT": "eef86aba59d93b4a8a90480e49d5d63b",
          "OK-ACCESS-KEY": "07e956d1-664e-4fcb-b918-e980d9184729",
          "OK-ACCESS-TIMESTAMP": timestamp,
          "OK-ACCESS-SIGN": sign,
          "OK-ACCESS-PASSPHRASE": "Amit@1234",
          "Content-Type": "application/json",
        },
      },
    );
    const {data:swapData} = await request.json();
    console.log("Swap Result : ", swapData[0]);
    
    if (!swapData || swapData.length === 0 || !swapData[0].tx) {
        throw new Error("Invalid swap data received");
    }

    const swapDataTxInfo = swapData[0].tx;
    
    // const privateKey =
    //   "private_key";

    // const provider = new ethers.InfuraProvider(
    //   "linea",
    //   "9d4e99ac816a49739bf0b3065d5c62dc"
    // );
    // const wallet = new ethers.Wallet(privateKey, provider);
    const web3 = new Web3("https://linea.drpc.org");
    const nonce = await web3.eth.getTransactionCount(userWalletAddress, "latest"); // userAddress
    const ratio = BigInt(3) / BigInt(2);
    let signTransactionParams = {
        data: swapDataTxInfo.data,
        gasPrice: BigInt(swapDataTxInfo.gasPrice) * BigInt(ratio),
        to: swapDataTxInfo.to,
        value: swapDataTxInfo.value,
        gas: BigInt(swapDataTxInfo.gas) * BigInt(ratio),
        nonce,
    };
    // console.log("Sign Transactions :" ,signTransactionParams)

    // const { rawTransaction } = await web3.eth.accounts.signTransaction(
    //     signTransactionParams,
    //     "private_key",
    // );
    // console.log("Raw Transactions :" ,rawTransaction)
    // const chainTxInfo = await web3.eth.sendSignedTransaction(rawTransaction);
    // console.log("chainTxInfo:", chainTxInfo);
    
    // const txResponse = await wallet.sendTransaction(signTransactionParams);
    // console.log("Transaction Hash:", txResponse.hash);

    // // Optionally wait for confirmation
    // const receipt = await txResponse.wait();
    // console.log("Transaction confirmed:", receipt);

    // const provider = new ethers.JsonRpcProvider('https://linea.blockpi.network/v1/rpc/public');

    // // Define the private key and initialize the wallet
    // const privateKey = 'a1f5202c7fa3014d04b888e272813452ad8b48207b6eca01ad0f9c025eacd735';
    // const wallet = new ethers.Wallet(privateKey, provider);

    // // Prepare the transaction details
    // const transaction = {
    //     to: '0xf858e8aA989775ee8C14C473DD8cC01Ef105A18c', // Recipient's address
    //     value: ethers.parseEther("0.00001"), // Convert 0.00001 ETH to wei
    //     gasLimit: 21000, // Standard gas limit for ETH transfer
    //     data: '0x' // Empty data field for ETH transfer
    // };
    // const txResponse = await wallet.sendTransaction(transaction);
    // console.log('Transaction Hash:', txResponse.hash);

    // // Optionally wait for confirmation
    // const receipt = await txResponse.wait();
    // console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.log("error : ", error);
  }
}
