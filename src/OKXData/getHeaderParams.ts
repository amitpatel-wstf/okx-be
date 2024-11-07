import CryptoJS from "crypto-js";

export function getHeaderParams(apiEndPoints: string, method: string) {
  try {
    const timestamp = new Date().toISOString();
    const sign = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(
        timestamp + method + apiEndPoints,
        "3A4193E92078633B376FB4937899E4A2",
      ),
    );
    const header = {
      "OK-ACCESS-PROJECT": "eef86aba59d93b4a8a90480e49d5d63b",
      "OK-ACCESS-KEY": "07e956d1-664e-4fcb-b918-e980d9184729",
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-SIGN": sign,
      "OK-ACCESS-PASSPHRASE": "Amit@1234",
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