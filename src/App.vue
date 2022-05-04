<template>
<div id="app d-flex flex-wrap">
    <block-grid :items="blocks" @addToCart="addToCart"/>
    <cart :items-in-cart="blocksInCart" :credits="initCredits"/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BlockGrid from '@/components/BlockGrid.vue'
import Cart from './components/Cart.vue'
import { BlockItemType } from '@/types'

@Component({
    components: {
        BlockGrid,
        Cart
    }
})
export default class App extends Vue {
    /* main variables */
    private blocks: Array<BlockItemType> = [];
    private blocksInCart: Array<BlockItemType> = [];
    private initCredits = 10000;

    /** get data and map to interface: */
    created(): void {
        fetch('https://api.up42.com/marketplace/blocks')
            .then(response => response.json())
            .then(data => {
                // TODO: split up filter and maping from fetch
                const filteredData = data.data.filter(
                    (item: any) => item.metadata.blockPricingStrategy.name === 'simple')
                this.blocks = filteredData.map((item: any) => {
                    return {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        credits: item.metadata.blockPricingStrategy.credits
                    }
                })
            })
    }

    addToCart(item: BlockItemType): void {
        this.blocksInCart.push(item)
    }

    removeFromCart(item: BlockItemType): void {
        this.blocksInCart.filter(i => i.id !== item.id)
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.block-grid {
    width: 75vw;
    display: inline-flex;
}

.block-item {
    display: inline-flex;
    width: 150px;
    height: 150px;
    padding-top: 5px;
    margin: 20px 20px 40px 20px;
    background: lightblue;
}

.cart {
    width: 20vw;
    display: inline-flex;
}
</style>
