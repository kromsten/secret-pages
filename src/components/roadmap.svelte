<script lang="ts">
	import Paper from '@smui/paper';
    
    let milestones = [
        {
            date : "Q3 2021",
            title : "Convert simple pages to an artistic design"
        },

        {
            date : "Q3 2021",
            title : "Minting the full collection"
        },

        {
            date : "Q4 2021",
            title : "Incorporate the metadata"
        },

        {
            date : "Q4 2021",
            title : "Secret Network (Stashh)"
        },

        {
            date : "Q4 2021",
            title : "Tokenomics $SCRPAG"
        },

        {
            date : "Q4 2021",
            title : "Web3 DeFi"
        },

        {
            date : "Q1 2022",
            title : "Lands for sale"
        },

        {
            date : "Q2 2022",
            title : "$SCRPAG ecosystem begins"
        },

        {
            date : "Q3 2022",
            title : "Trailer release"
        },

        {
            date : "Q4 2022",
            title : "Launch of the series"
        },
    ]
</script>



<div>
    <div class="center">
        <h3 class="mdc-typography--headline3">Roadmap</h3>
    </div>
    <div class="center wrapper">
        <div class="divider"></div>

        { #each milestones as ms, i }

            <div class="center { i % 2 == 0 ? "left" : "right"}" data-aos="zoom-in" data-aos-duration='1400'>
                
                <Paper variant="outlined" elevation={10} class="paper">

                        <div class="bubble center" class:unfinished={i > 2}>
                            <h5>
                                {ms.date}
                            </h5>
                            
                            <p>{ms.title}</p>
        
                        </div>
                </Paper>

            </div>
        {/each }
    </div>

</div>


<style>

    .wrapper {
        padding: 0 12%;
    }
    
    .bubble {
        padding: 3vh 1.0vw;
        max-width: 26vw;

        background-color: var(--mdc-theme-primary, #383838);
        color: white;
        
        font-weight: bold;

    }

    .left {
        align-self: start;
    }

    .right {
        align-self: end;
    }

    p {
        display: flex;
    }

    .divider {
        border-left: 1px solid #cfcfcf;
        background: #d8d8d8;
        width: 0.05px;
        height: 180%;
        position: absolute;
        right: 50%;
    }


    h3 {
        margin: 20vh auto;
    }

    .unfinished {
        box-shadow: inset 0 0 0.1vw var(--mdc-theme-primary, #383838);;
        background-color: white;
        color: var(--mdc-theme-primary, #383838);
    }

    :global(.paper) {
        padding: 0;
    }
</style>