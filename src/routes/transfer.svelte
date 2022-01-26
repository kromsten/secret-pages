<script lang="ts">
    import Button from '@smui/button';
    import { web3state } from "../ts/stores"

    let response : any;
    let token_id : string, recipient : string;
</script>

<div>
    <label> Token ID
        <input bind:value={token_id} type="text">
    </label>

    <label> To 
        <input bind:value={recipient} type="text">
    </label>

    <Button on:click={() => { 

        if (!token_id || !recipient) { return; }

        web3state.transfer(token_id, recipient)
        .then(r => response = r.toString())
        .catch((e) => response = e.toString());
    }}>
        Transfer
    </Button>

    {#if response}
        <p>
            { response }
        </p>
    {/if}

</div>

<style>
    div {
        min-height: 40vh;
    }
</style>