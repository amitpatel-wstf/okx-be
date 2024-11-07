import express from 'express'
export const Routes = express.Router();

Routes.post("/getWalletBalance",async(req,res)=>{
  res.send("Wallet Balance")
})
