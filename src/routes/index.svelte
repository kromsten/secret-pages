<script lang="ts">
	import Pages from "../components/pages.svelte"
	import Roadmap from "../components/roadmap.svelte";
</script>


<div class="flexcont">
	<Pages />
	<Roadmap />
</div>


 
<style>

	:global(.center) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	:global(.smui-paper) {
		padding: auto 0;
	}

	:global(img) {
		border-radius: 15%;
	}

	.flexcont {
		display: flex;
		flex-direction: column;
		gap: 17vh;
	}
  </style>