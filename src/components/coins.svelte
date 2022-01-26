<script lang="ts">
    import { cards } from "../info";
</script>

<div class="wrapper">
{ #each cards as card, i }
    
    <div class="card smui-paper--elevation-z6"
        data-aos="fade-left" data-aos-duration="2000" data-aos-delay={30 * (i+1)}>
        <img src={card.coin_img} alt="{card.name} coin" />
        <div class="center">
            <h5>{ card.name !== "Black" ? card.name : "Ruby" } Coin</h5>
            <p>{ card.rarity }</p>
        </div>
    </div>
{ /each }
</div>

<style>

    .wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 2vw;
        flex-wrap: wrap;
    }

    .card {
        display: flex;
        gap: 1vw;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
        padding: 3vh 1.3vw;
    }

    .card:hover {
        transform: scale(1.08);
    }

    img {
        min-width: 4vw;
        max-width: 8vw;
        height: auto;
    }

    h5, p {
        margin: 0;
    }


</style>