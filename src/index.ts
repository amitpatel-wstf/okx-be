import "dotenv/config";
import express from "express";
import { Routes } from "./Routes/route";
import { getWalletBalance } from "./helpers/getWalletBalance";
import { getSwapTransactionData } from "./helpers/getSwapCallData";
import { getTokenInformation } from "./helpers/getTokenInformation";
import { getCrossChainSwapCallData } from "./helpers/getCrossChainSwapCallData";
import { getSupportedTokenOnCrossChain } from "./swap/getSupportedTokenOnChainCrossChain";
import { crossChainSwap } from "./swap/crossChainSwap";
import { getPriceHistory } from "./Prices/getPriceHistory";
import { getTokenPrice } from "./Prices/getTokenPrice";

export const baseUrl = "https://www.okx.com";

const app = express();
// middlewares
app.use(express.json());
app.use(Routes);

app.get("/", async (req, res) => {
  res.send("Server is working");
});

app.get("/getWalletBalance", async (req, res) => {
  try {
    // 0x59114f40e8d52cb2ceb79d06f6cf94cd40bdfe88
    const { walletAddress } = req.query;
    if (!walletAddress) {
      res
        .status(403)
        .json({ status: false, msg: "WalletAddres and chain is required.." });
      return;
    }
    const walletBalance = await getWalletBalance(
      walletAddress.toString(),
      "8453",
    );
    res.json({ msg: "Wallet Balance", data: walletBalance });
  } catch (error) {
    console.log("Error while getting wallet balance : ", error);
    res
      .status(500)
      .json({ msg: "Error while getting wallet balance", status: false });
  }
});

app.get("/getSwapTransactionData", async (req, res) => {
  try {
    console.log("Request : ", req.query);
    const {
      amount,
      fromTokenAddress,
      toTokenAddress,
      slippage,
      walletAddress,
    } = req.query;
    if (
      !amount?.toString() ||
      !fromTokenAddress?.toString() ||
      !toTokenAddress?.toString() ||
      !slippage?.toString() ||
      !walletAddress?.toString()
    ) {
      res.status(403).json({
        status: false,
        msg: "amount, fromTokenAddress, toTokenAddress, slippage, walletAddress are required..",
      });
      return;
    }
    const swapTransactionData = await getSwapTransactionData(
      "8453",
      amount?.toString(),
      fromTokenAddress?.toString(),
      toTokenAddress?.toString(),
      slippage?.toString(),
      walletAddress?.toString(),
    );
    res.setHeader("content-type", "application/json");
    res
      .status(200)
      .json({ status: true, msg: "success", data: swapTransactionData });
  } catch (error: any) {
    console.log("Error while build the transaction call data.", error);
    res
      .status(500)
      .json({ status: false, msg: "Error while builind the transactions." });
  }
});

app.get("/getTokenInformation", async (req, res) => {
  try {
    const { tokenAddress } = req.query;
    if (!tokenAddress) {
      res
        .status(403)
        .json({ status: false, msg: "TokenAddress is required.." });
      return;
    }
    const tokenInformation = await getTokenInformation(
      tokenAddress?.toString(),
    );
    res.json({ status: true, msg: "success", data: tokenInformation });
  } catch (error) {
    console.log("Error while getting the token information : ", error);
    res
      .status(500)
      .json({ msg: "Error gettting the token information", status: false });
  }
});

app.get("/getCrossChainSwapCallData", async (req, res) => {
  try {
    const {
      fromTokenAddress,
      fromChainId,
      amount,
      toChainId,
      toTokenAddress,
      userWalletAddress,
    } = req.query;
    if (
      !fromTokenAddress?.toString() ||
      !fromChainId?.toString() ||
      !amount?.toString() ||
      !toChainId?.toString() ||
      !toTokenAddress?.toString() ||
      !userWalletAddress?.toString()
    ) {
      res.status(403).json({
        status: false,
        msg: "fromTokenAddress, fromChainId, amount, toChainId, toTokenAddress, userWalletAddress are required..",
      });
      return;
    }
    console.log("Amount : ", amount);
    const crossChainSwapCallData = await getCrossChainSwapCallData(
      fromChainId.toString(),
      fromTokenAddress.toString(),
      amount.toString(),
      toChainId.toString(),
      toTokenAddress.toString(),
      userWalletAddress.toString(),
    );
    res
      .status(200)
      .json({ msg: "Cross Chain swap data", data: crossChainSwapCallData });
  } catch (error: any) {
    console.log("Error : ", error);
  }
});

app.listen(3000, () => {
  console.log("server started");
});

// getSupportedTokenOnCrossChain();
// crossChainSwap();
// getPriceHistory()
// getTokenPrice()
// getTokenInformation(
//   "0xa219439258ca9da29e9cc4ce5596924745e12b93,0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f",
// );
