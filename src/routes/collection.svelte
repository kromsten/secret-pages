<script lang="ts">
  import Drawer, { AppContent, Content } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { Image } from "@smui/image-list"
  import { onMount } from "svelte";
  import { Circle, Circle3 } from 'svelte-loading-spinners'
  import Button from '@smui/button';
  
  import Label from '@smui/list/src/Label.svelte';
  import { web3state } from "../ts/stores"
  import { decryptPic } from "../ts/utils";
  
  
  import { State } from "../ts/types"
  
  const reloadMax = 20;
    
  let nfts : Array<object>  = [];
  
  let state : State = State.Loading;

  let selIndex : number | null = null;

  let main_img : string | undefined = undefined;
  
  let error : string = "";

  
  let collection : Array<object> | string | null;
  let counter : string | null;
  
  

  const update = () => { 


    web3state.getTokens().then((tokens) => {
      
      
      for (const id of tokens.token_list.tokens) {
        
        if (nfts?.some(nft => nft.num === id.toString())) continue;
        

        web3state.getToken(id).then((token) => {
            
          const pub = token.nft_dossier.public_metadata.extension;
          const media = token.nft_dossier.private_metadata.extension.media;
          
          
          setTimeout(() => {if (selIndex == null) {
            selIndex = 0
            main_img = "data:image/jpg;base64," + nfts[selIndex].page;
          } }, 3000)
          
          
          const newNft = {
            num : pub.name,
            pub_image : pub.image,
            rarity : pub.attributes[0].value,
          }
          
          media.forEach((medium : any, i : number) => {
              
              if (i == 0) {

                state = State.Decrypting;

                decryptPic(medium.url, medium.authentication.key)
                .then(base64 => {
                  newNft.page = base64;
                  state = State.Ready;
                })
              }

              else {

                if (medium.authentication) {
                                    
                  decryptPic(medium.url, medium.authentication.key)
                  .then(base64 => {
                    newNft.land = base64;
                    state = State.Ready;
                  })
                } else {
                  newNft.ticket = medium.url;
                }
            }
          })

          nfts = [...nfts, newNft];
        })
      }

      setTimeout(() => { if (state == State.Loading) { state = State.Ready; }}, 5000)

      
      setTimeout( () => { 
        if (Number(counter) >= reloadMax) counter = "1"
        localStorage.setItem('collection', JSON.stringify(nfts))
        localStorage.setItem('counter', counter.toString())
      }, 15000)

    })
    
  }
    

  onMount(() => { 

    collection  = localStorage.getItem('collection');
    counter = localStorage.getItem('counter');

    if (collection) collection = JSON.parse(collection);

    if ( counter == null ) { counter = '1' }
    else { counter = (Number(counter) + 1).toString() }

    if (counter !== "1" && Number(counter) < reloadMax && collection?.length > 0) {
      nfts = collection
      localStorage.setItem('counter', counter)
      state = State.Ready;
      
    } else {
      update();
    }


  })


</script>



<div class="top_div">

  { #if state === State.Loading }
    <h5 class="mdc-typography--headline5">Loading collection</h5>
    <div class="center">
      <Circle3 />
    </div>
  { :else if state === State.Error }
    <div>
      <h6 class="mdc-typography--headline6">
        There was an error loading the collection:
      </h6>
      <p class="mdc-typography--body2">
        { error }
      </p>
      <p class="mdc-typography--body1">
        Check your Keplr account for messages and try reloading the page
    </div>
  {:else } 
    { #if nfts.length == 0 }
      <div>
        <h6 class="mdc-typography--headline6">
          Looks like you don't have any script pages yet
        </h6>
        <p class="mdc-typography--body1">
          Try <a href="/mint">minting</a>
           one or get one from <a href="https://stashh.co/" rel="nofollow noopener noreferrer" target="_blank">Stashh</a></p>
      </div>
    { :else }
      <div class="wrapper">

        <LayoutGrid>
          <Cell span={3}>
            <div class="drawer_wrapper">
              <Drawer>
                  <Content>
                    <List>
      
                      { #each nfts as nft, i}
                          <Item
                          href="javascript:void(0)"
                          on:click={async () => {
                            selIndex = i;
                            main_img = "data:image/jpg;base64," + nfts[selIndex].page
                          }}
                          >
                        
                          <Text>Script page #{ nft.num }</Text>
                          </Item>
                      {/each}
                    </List>
                  </Content>
                  <Button on:click={() => { 

                      if (state !== State.Updating) {
                        state = State.Updating;
                        update();
                        setTimeout(() => { state = State.Ready }, 5000)
                      }
                    }
                  }
                  >
                  
                  <span class="btn_text">
                    Update
                  </span>
                  { #if state == State.Updating }
                    <div class="center btn_load">
                      <Circle size={20} unit="px" color="black"/>
                    </div>
                  { /if }
                </Button>

                  

              </Drawer>

            </div>
          </Cell>

          <Cell span={6}>
            <div class="content_wrapper">
              <AppContent class="app-content">
                  <div class="main-content">
                    <pre class="nft_wrapper center">


                      <div class="center">

                        { #if selIndex != null && nfts[selIndex] }

                            <Image src={main_img} alt="nft metadata"/>
                            
                        {/if}

                      </div>


                    </pre>
                      
                  </div>
              </AppContent>
            </div>
          </Cell>

          <Cell span={3}>
            {#if selIndex != null && nfts[selIndex] }
                            
                <div class="attrbutes center">
                  <List>

                    <div>
                      <Item>
                        <div class="center rarity">

                          <Label>Rarity:</Label>
                          <Text>
                            <strong class="mdc-typography--caption">
                              {nfts[selIndex].rarity}
                            </strong>
                          </Text>
                        </div>
                      </Item>
                    </div>

                    <div class="center column">
                      <h6 class="mdc-typography--header6">Page:</h6>
                      <Item on:click={() => { main_img = "data:image/jpg;base64," + nfts[selIndex].page }}>
                        <Image src="{nfts[selIndex].pub_image}" width=100px height=80px/>
                      </Item>
                    </div>


                    { #if nfts[selIndex].land  }

                      <div class="center column">
                        <h6 class="mdc-typography--header6">Land:</h6>
                        <Item on:click={() => { main_img = "data:image/jpg;base64," + nfts[selIndex].land }}>
                          <Image src="data:image/jpg;base64,{nfts[selIndex].land}" width=100px height=80px/>
                        </Item>
                      </div>
                    { /if}


                    { #if nfts[selIndex].ticket  }

                      <div class="center column">
                        <h6 class="mdc-typography--header6">Ticket:</h6>
                        <Item on:click={() => { main_img = nfts[selIndex].ticket; } }>
                          <Image on:click={() => {}}
                          src={nfts[selIndex].ticket} width=100px height=80px/>
                        </Item>
                      </div>
                    { /if}



                  </List>
                </div>
                {/if}
          </Cell>

        </LayoutGrid>
        
        {#if selIndex != null && nfts[selIndex] }

          <div class="center">
            You can import this token to Stashh using &nbsp;<a href={"https://stashh.io/asset/secret1usycsk8ex8gj4t2uzg6sadkcw4jvflkjkxldk8/" + nfts[selIndex].num} rel="nofollow noopener noreferrer" target="_blank"> this </a> &nbsp; link 
          </div>

      { /if}


      </div>
    {/if}
  
  
  {/if}
</div>


  
<style>

  .nft_wrapper {
    flex-direction: row;
  }

  .top_div {
    min-height: 42vh;
  }

  .drawer_wrapper {
    display: flex;
  }
  
  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }

  .center {
    display: flex;
    justify-content:center;
    align-items: center
  }

  .rarity {
    width: 100%;
    justify-content: space-around!important;
  }

  .column {
    flex-direction:column!important;
  }

  h6 { 
    margin-bottom: 0
  }

  .btn_text {
    margin-right: 15%;
  }

  .btn_load {
    padding: 5%;
  }

  :global(.mdc-image-list__image) {
    object-fit: cover;
    height: 100%;
  }

  :global(.column > .mdc-deprecated-list-item) {
    min-width: 10vw;
  }

</style>

