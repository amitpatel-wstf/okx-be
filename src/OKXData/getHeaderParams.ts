import CryptoJS from "crypto-js";


export function getHeaderParams(apiEndPoints: string, method: string) {
  try {
    const timestamp = new Date().toISOString();
    const sign = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(
        timestamp + method + apiEndPoints,
        process.env.SIGN || "",
      ),
    );
    const header = {
      "OK-ACCESS-PROJECT": process.env.PROJECT_ID || "",
      "OK-ACCESS-KEY": process.env.ACCESS_KEY || "",
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-SIGN": sign,
      "OK-ACCESS-PASSPHRASE": process.env.PASSPHRASE || "",
      "Content-Type": "application/json",
    };
    return header;
  } catch (error) {
    console.log('Error while getting the header params : ',error)
  }
}

export async function getResponseMessage(url:string,method:string,header:any){
  try {
    console.log("URL: ", url);
    const request = await fetch(url, {
      headers: header,
    });
    const response = await request.json();
    console.log("Response: ", response);
    return response.data;
  } catch (error) {
    console.log("Error while requesting : ",error);
  }
}