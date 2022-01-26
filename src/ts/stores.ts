import {  SigningCosmWasmClient } from "secretjs";

import { customFees, snip20SendMsg } from "./messages";

const restAddress = "https://api.scrt.network/"
const sSCRTcontract = "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek"



const sleep = (ms : number) => new Promise((accept) => setTimeout(accept, ms));


const tryWait = async (conditionCallback : Function, 
                errorText : string,
                timeout : number = 1200) => {

    let counter = 0;

    while (conditionCallback()) {
        counter += 10;
        if (counter > timeout) {
            throw Error(errorText);
        }
        await sleep(10);
    }
    
}


class Web3State {

    private client : any;
    private address : string = "";

    private readonly permitParams : any = {
        permit_name: "secret_page_permit",
        allowed_tokens: [this.contractAddress],
        permissions: ['owner'],
    };

    private signature : any;


    constructor(
        public connected: boolean = false,
    	public chainId : string = 'secret-4',
        public contractAddress : string = "secret1usycsk8ex8gj4t2uzg6sadkcw4jvflkjkxldk8"

    ) {
        if (typeof window !== 'undefined') {
            const conn : string | null  = localStorage.getItem("connected");
            connected = conn === "true";

            const sigStr : string | null  = localStorage.getItem("signature");
            if (sigStr) this.signature = JSON.parse(sigStr);
        }
    }


    async setupKeplr() {
        
        // Wait for Keplr to be injected to the page
        await tryWait(() => (!window.keplr && !window.getOfflineSigner && !window.getEnigmaUtils), 
                            "Couldn't connect to Keplr. Make sure it is installed")
        
                            
        
        // Enable Keplr.
        // This pops-up a window for the user to allow keplr access to the webpage.
        await window.keplr.enable(this.chainId);

    
        // Setup SecrtJS with Keplr's OfflineSigner
        // This pops-up a window for the user to sign on each tx we sent
        const keplrOfflineSigner  = window.getOfflineSigner(this.chainId);

        const accounts = await keplrOfflineSigner.getAccounts();
        this.address = accounts[0].address;
        

        this.client = new SigningCosmWasmClient(
          restAddress,
          this.address,
          keplrOfflineSigner,
          window.getEnigmaUtils(this.chainId),
          customFees
        );
    
        this.connected = true;
        localStorage.setItem("connected", "true")
    }


    async getSignature() {
        
        const {signature} = await window.keplr.signAmino(
            this.chainId,
            this.address,
            {
                chain_id: this.chainId,
                account_number: "0", // Must be 0
                sequence: "0", // Must be 0
                fee: {
                    amount: [{denom: "uscrt", amount: "0"}], // Must be 0 uscrt
                    gas: "1", // Must be 1
                },
                msgs: [
                    {
                        type: "query_permit", // Must be "query_permit"
                        value: this.permitParams
                    },
                ],
                memo: "", // Must be empty
            },
            {
                preferNoSetFee: true, // Fee must be 0, so hide it from the user
                preferNoSetMemo: true, // Memo must be empty, so hide it from the user
            }
        );
      this.signature = signature;

      localStorage.setItem("signature", JSON.stringify(signature));

      return signature
  }

    async customQueryPermit(query:object) {

        const q = {
            with_permit: { 

                query,

                permit: {
                  params: {
                    ...this.permitParams, 
                    chain_id : this.chainId
                  },    
                      
                  signature: this.signature ?? await this.getSignature(),
              },       
          
            }
        }
        const r = await this.client.queryContractSmart(this.contractAddress, q)
        return r
    }

    async customQuery(query:object) {
        const r = await this.client.queryContractSmart(this.contractAddress, query)
        return r
    }


    async getToken(id:string) {
        return await this.customQueryPermit({ nft_dossier : { token_id : id }})
    }

    async transfer(token_id:string, recipient:string) {
        return await this.client.execute(this.contractAddress, { transfer_nft : { token_id, recipient }} )    
    }

    async getTokens() {
        await tryWait(() => !this.address, "Couldn't get tokens", 5000)
        return await this.customQueryPermit({ tokens : { owner : this.address }})
    }



    private async hash(address: string = this.contractAddress): Promise<string> {
        return await this.client.restClient.getCodeHashByContractAddr(address);
    }

    private async swap(sSCRT="150") {
        const swap = {
            deposit: {}
        }
    
        const amount = [
            { 
                denom: 'uscrt',
                amount: sSCRT + '000000'
            }
        ]

        return await this.client.execute(sSCRTcontract, swap, '', amount);
    }


    async mint() {
        const response =  await this.client.execute(sSCRTcontract, snip20SendMsg())
        return response;
    }




}


export const web3state = new Web3State();
