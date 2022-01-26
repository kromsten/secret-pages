import { Buffer  } from 'browser-crypto';

const contractAddress = "secret1usycsk8ex8gj4t2uzg6sadkcw4jvflkjkxldk8";
const hash = "6946700d31f003e7f6db7a8e18a378ad855f9b46e129228bc2b8d29ad16eb1f7";


const mintMsg : object = {
    receive_mint: {}
};


export const snip20SendMsg = (a : string = contractAddress, h : string = hash) => {
    return {
        send: {
            amount: "150000000",
            recipient: a,
            recipient_code_hash: h,
            msg: Buffer.from(JSON.stringify(mintMsg)).toString('base64')        
        }
    }
}


export const customFees = {

    exec: {
        gas: "500500",
    },

  }