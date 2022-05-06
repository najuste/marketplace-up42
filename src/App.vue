<template>
<div id="app">
    <header>Credits: <strong>{{ credits }}</strong></header>
    <main class="d-flex flex-wrap">
        <block-grid :blocks="blocks" @addToCart="addToCart"/>
        <cart :items-in-cart="blocksInCart" :credits="credits" @removeItem="removeFromCart" @checkout="balanceOut"/>
    </main>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlockGrid from '@/components/BlockGrid.vue';
import Cart from './components/Cart.vue';
import { BlockInCart, Block, CartItem } from '@/types';
import { getDataBlocks } from '@/dataProvider';
import { cartListWithUpdatedAmmount, increase, decrease } from '@/utils';

@Component({
    components: {
        BlockGrid,
        Cart
    }
})
export default class App extends Vue {
    /* main variables */

    private loading = true;

    /** All awailable block items with data for display */
    private blocks: Array<Block> = [];

    /** Cart items list of item ids and ammount of items */
    private cart: Array<CartItem> = []; // TODO: could be represented as Map

    /** Initial ammount of credits given for the user */
    private userCredits = 10000; // TODO: could be stored in localstorage

    /** getter blocksInCart prepares items in cart as the blocks by id */
    get blocksInCart(): Array<BlockInCart> {
        const result: Array<BlockInCart> = [];
        this.cart.map((cartItem) => {
            const blockItem = this.blocks.find(blockItem => blockItem.id === cartItem.blockId);
            result.push({ ...cartItem, name: blockItem?.name || '', credits: blockItem?.credits || 0 });
        });
        return result;
    }

    get blockIdsInCart(): Array<string> {
        return this.cart.map((item) => item.blockId);
    }

    /** getter credits returns the available credits for the user */
    get credits(): number {
        return this.userCredits;
    }

    async beforeCreate(): Promise<void> {
        const data = await getDataBlocks();
        if (data && data.data) {
            this.blocks = this.convertDataToBlocks(data.data);
        }
        if (data && data.error) {
            window.alert(`Error from receiving data: ${data.error}`);
            console.log(data.error);
        }
    }

    /** function convertDataToBlocks - maps data to an interface
     * @var data - list of data returned form the api endpoint
     */
    // TODO generate the typings from the API scheme
    /* eslint-disable @typescript-eslint/no-explicit-any */
    convertDataToBlocks(data: Array<unknown>): Array<Block> {
        const filteredData = data.filter((item: any) => item.metadata.blockPricingStrategy.name === 'simple');
        return filteredData.map((item: any) => {
            return {
                id: item.displayId,
                name: item.displayName,
                credits: item.metadata.blockPricingStrategy.credits
            };
        });
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */

    /** function addToCart - adds item id to the cart if no such id present or updates the amount
     * @var item - block Item
     */
    addToCart(item: Block): void {
        if (this.blockIdsInCart.includes(item.id)) {
            this.cart = cartListWithUpdatedAmmount(this.cart, item.id, increase);
        } else {
            this.cart.push({ blockId: item.id, ammount: 1 });
        }
    }

    /** function removeFromCart - removes item id from the cart if single item, otherwise reduces the amount
     * @var item - block Item
     */
    removeFromCart(item: BlockInCart): void {
        const itemToRemove = this.cart.find(cartItem => cartItem.blockId === item.blockId);
        if (!itemToRemove) {
            throw new Error('Cannot remove item from the cart as id was not found!');
        }
        if (itemToRemove.ammount > 1) {
            this.cart = cartListWithUpdatedAmmount(this.cart, item.blockId, decrease);
        } else {
            this.cart = this.cart.filter(cartItem => cartItem.blockId !== item.blockId);
        }
    }

    balanceOut(removeCredits: number): void {
        this.userCredits -= removeCredits;
        this.cart = [];
    }
}
</script>

<style>
:root {
  --min-pad: 5px;
  --med-pad: 15px;
  --max-pad: 50px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #102133;
}

body {
    height: 100vh;
    margin: 0;
}

header {
    height: 10vh;
    padding: var(--med-pad) 10vw;
    text-align: right;
}

.blockGrid {
    width: 75vw;
    height: 90vh;
    margin: var(--min-pad);
    overflow: scroll;
}

.blockGrid_item {
    width: 200px;
    height: 150px;
    padding-top: var(--min-pad);
    margin-bottom: var(--min-pad);
    background: #c9dcff;
}

.cart {
    width: 20vw;
    margin: var(--min-pad);
    padding: var(--med-pad);
    display: inline-flex;
    border-radius: var(--min-pad);
    background: #e2ecfd;
}
</style>
