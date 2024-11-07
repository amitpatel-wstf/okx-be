import Web3 from 'web3';

const web3 = new Web3("https://linea.drpc.org");
export async function TransactionExecute(tx:any,walletAddress="0xf858e8aA989775ee8C14C473DD8cC01Ef105A18c",privateKey="private-key"){
  console.log("Tx : ",tx)
  try{
    const nonce = await web3.eth.getTransactionCount(walletAddress, "latest"); // userAddress
    const ratio = BigInt(3) / BigInt(2);
    let signTransactionParams = {
        data: tx.data,
        gasPrice: BigInt(tx.gasPrice) * BigInt(ratio),
        to: tx.to,
        value: tx.value,
        // gas: BigInt(tx.gas) * BigInt(ratio),
        nonce,
    };
    console.log("Sign Transactions :" ,signTransactionParams)

    const { rawTransaction } = await web3.eth.accounts.signTransaction(
        signTransactionParams,
        privateKey,
    );
    console.log("Raw Transactions :" ,rawTransaction)
    const chainTxInfo = await web3.eth.sendSignedTransaction(rawTransaction);
    console.log("chainTxInfo:", chainTxInfo);
  }catch(error){
    console.log("Error while exexute transaction : ",error)
  }
}