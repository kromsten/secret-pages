<script lang="ts">
	import Button from '@smui/button';
	import TopAppBar, {
		Row,
		Section,
		AutoAdjust,
		TopAppBarComponentDev
	} from '@smui/top-app-bar';


	import SocialIcons from "@rodneylab/svelte-social-icons";
	import { onMount } from "svelte";
	
	import { web3state } from "../ts/stores"
	import { formatAddress } from "../ts/utils";

	let connected : boolean;

	const setupKeplr = () => {
		web3state.setupKeplr()
		.then(() => connected = web3state.connected )
		.catch(e => { console.error(e) })
	}
	
	onMount(() => {
		const conn : string | null  = localStorage.getItem("connected");
		if (conn  === "true") setupKeplr();
	})

	let topAppBar: TopAppBarComponentDev;

</script>

<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
			<Button href="/">Secret Pages</Button>
		</Section>


		<Section align="end" toolbar>


			{ #if connected}
				
				<Button href="/mint">Mint</Button>

				<Button href="/collection">My Collection</Button>

				<Button>
					{ formatAddress( web3state.address) }
				</Button>

			{ :else }
				<Button on:click={()=>setupKeplr()}>Keplr Connect</Button>
			{/if }



		</Section>
	</Row>
</TopAppBar>

<AutoAdjust {topAppBar} style="display: flex; justify-content: space-between;">
	<div class="container">
		<slot />
	</div>
</AutoAdjust>


<footer>
	<div class="icon-wrapper">
		<a href="https://twitter.com/bkkiot" rel="nofollow noopener noreferrer" target="_blank">
			<SocialIcons network="twitter" fgColor="#fff"/>
		</a>
		<a href="https://discord.com/channels/914614019048996975/914614019640414240" rel="nofollow noopener noreferrer" target="_blank">
			<SocialIcons network="discord" fgColor="#fff"/>
		</a>
	</div>

</footer>

<style>
	footer {
		padding: 7vh 0;
		background-color: var(--mdc-theme-primary, #383838);

		left: 0;
		bottom: 0;
		width: 100%;

		margin-top: 20vh;
	}

	.icon-wrapper {
		display: flex;
		gap: 1vw;
		justify-content: end;
		margin-right: 8vw;
	}

	.container {
		max-width: 100vw;
		margin: 0 auto;
	}

	:global(header) {
		z-index: 10;
	}
</style>
