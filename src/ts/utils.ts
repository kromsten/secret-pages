//import crypto from 'crypto';

import { Buffer,  createDecipheriv  } from 'browser-crypto';


//import { Buffer } from "buffer";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;

export function formatAddress(address:string) {
    const len : number = address.length;
    return len < 10 ? address : address.substring(0,8) + "..." + address.substring(len-4, len-1)
}


export const decrypt = (dataBuffer: Buffer, key: string): Buffer => {
    // Create cipherKey
    const cipherKey = Buffer.from(key);
    // Get iv and its size
    const ivSize = dataBuffer.readUInt8(0);
    const iv = dataBuffer.slice(1, ivSize + 1);
    // Get authTag - is default 16 bytes in AES-GCM
    const authTag = dataBuffer.slice(ivSize + 1, ivSize + 17);
  
    // Create decipher
    const decipher = createDecipheriv(ALGORITHM, cipherKey, iv);
    decipher.setAuthTag(authTag);
  
    return Buffer.concat([
      decipher.update(dataBuffer.slice(ivSize + 17)),
      decipher.final(),
    ]);
  };


export const decryptPic = async (address : string, key: string) => {
    const result = await fetch(address)
    const data = Buffer.from(await result.arrayBuffer());
    const plain = decrypt(data, key)
    return plain.toString('base64');
}
