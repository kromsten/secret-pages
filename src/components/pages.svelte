<script lang="ts">

    import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Paper, { Content } from '@smui/paper';
	import { Image } from '@smui/image-list';
    
    import AOS from 'aos';
	import 'aos/dist/aos.css';
	import { onMount } from 'svelte';
	

	onMount(() => {
		AOS.init();
	})

    import { cards } from "../info"
</script>


{ #each cards as card, i }
        
    <div data-aos={i % 2 == 1 ? "fade-left" : "fade-right"}
        data-aos-duration="1400" data-aos-delay="150" 
        class="card"
        class:end={i % 2 == 1}>
        <Paper elevation={6}>
            <LayoutGrid>

                { #if i % 2 == 1 }
                    <Cell span=6 align="middle">

                        <div class="center">
                            <div class="center">
                                <h6 class="mdc-typography--headline6" style="color: {card.color}">{ card.name } page</h6>
                            </div>
                            <Content>
                                <div class="center">
                                    <p class="mdc-typography--caption">{ card.rarity }</p>
                                    <p class="mdc-typography--overline">{ card.extra }</p>
                                </div>
                            </Content>
                        </div>
                    </Cell>

                    <Cell span=5>
                        <Image src={card.img}/>
                    </Cell>
                    
                    <Cell span={11} align="middle">
                        <p class="mdc-typography--body2">{ card.description }</p>
                        <br>
                        <p class="mdc-typography--body2">{ card.description2 }</p> 
                    </Cell>

                
                { :else }

                    <Cell span=5>
                        <Image src={card.img}/>
                    </Cell>

                    <Cell span=6 align="middle">
                        <div class="center">
                            <h6 class="mdc-typography--headline6" style="color: {card.color}">{ card.name } page</h6>
                        </div>
                        <Content>
                            <div class="center">
                                <p class="mdc-typography--caption center">{ card.rarity }</p>
                                <p class="mdc-typography--overline">{ card.extra }</p>
                            </div>
                        </Content>
                    </Cell>
                    <Cell span={11} align="middle">
                        <p class="mdc-typography--body2">{ card.description }</p> 
                        <br>
                        <p class="mdc-typography--body2">{ card.description2 }</p> 
                    </Cell>
                {/if}

            </LayoutGrid>
        </Paper>

    </div>


{/each}


<style>
    .card {
		max-width: 55%;
    }

    .end {
		align-self: flex-end;
	}

	p, h6 {
		margin: 0;
	}

	.mdc-typography--body2, .mdc-typography--caption {
		color: #4e4848;
	}
</style>