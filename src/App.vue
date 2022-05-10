<template>
<div id="app">
    <header data-test-credits class="d-flex justify-content-end">
        <div class="m-4">Credits: <strong>{{ credits }}</strong></div>
        <div v-show="isMobile"
             class="m-4 pointer position-relative"
             @click="toggleCart">
            <img src="@/assets/cart.svg" alt="Cart">
            <span v-if="!!blocksInCart.length" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ blocksInCart.length }}
            </span>
        </div>
    </header>
    <main class="d-flex flex-wrap justify-content-center">
        <div class="blockGrid m-2">
            <div v-if="loading"
                 data-test-spinner
                 class="spinner-border text-primary"
                 role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <block-grid :items="blocks"/>
        </div>
        <the-cart :items-in-cart="blocksInCart"
                  :credits="credits"
                  @removeItem="removeFromCart"
                  @checkout="balanceOut"
                  :class="{ 'd-none': isMobile && !cartInMobileView,
                            'cart--mobileView' : cartInMobileView}"/>
    </main>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlockGrid from '@/components/BlockGrid.vue';
import TheCart from './components/TheCart.vue';
import { BlockInCart, Block, CartItem } from '@/types';
import { getDataBlocks } from '@/dataProvider';
import { cartListWithUpdatedAmount, increase, decrease } from '@/utils';
import { EventBus } from '@/main';

@Component({
    components: {
        BlockGrid,
        TheCart
    }
})
export default class App extends Vue {
    private loading = true;

    /** Alert message for the user to shown */
    private alertMessage: string | null = null;

    /** All awailable block items with data for display */
    private blocks: Array<Block> = [];

    /** Cart items list of item ids and amount of items */
    private cart: Array<CartItem> = []; // TODO: could be represented as Map

    /** Initial amount of credits given for the user */
    private userCredits = 10000; // TODO: could be stored in localstorage

    private cartInMobileView = false;

    get isMobile(): boolean {
        return window.innerWidth <= 576;
    }

    /** getter blocksInCart prepares items in cart for display */
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

    async mounted(): Promise<void> {
        const response = await getDataBlocks();
        this.loading = false;
        if (typeof response === 'string') {
            this.alertMessage = response;
            window.alert(this.alertMessage);
            // TODO: there could be an auto re-fetch on failure mechanism
        } else {
            if (response && response.data) {
                this.blocks = this.convertDataToBlocks(response.data);
            }
            if (response && response.error) {
                this.alertMessage = `Error from receiving data: ${response.error}`;
                console.log(response.error);
            }
        }
    }

    created(): void {
        EventBus.$on('addToCart', (item: Block) => {
            this.addToCart(item);
        });
        this.updateUserCartFromLocalStorage();
    }

    private updateUserCartFromLocalStorage() {
        const cartFromLocalStorage = window.localStorage.getItem('marketplace-up42-cart');
        if (cartFromLocalStorage) {
            try {
                this.cart = JSON.parse(cartFromLocalStorage);
            } catch (error) {
                window.alert('Items in your cart left from earlier could not be loaded');
            }
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
     * and sets it to localStorage;
     * @var item - block Item
     */
    addToCart(item: Block): void {
        if (this.blockIdsInCart.includes(item.id)) {
            this.cart = cartListWithUpdatedAmount(this.cart, item.id, increase);
        } else {
            this.cart.push({ blockId: item.id, amount: 1 });
        }
        window.localStorage.setItem('marketplace-up42-cart', JSON.stringify(this.cart));
    }

    /** function removeFromCart - removes item id from the cart if single item, otherwise reduces the amount
     * @var item - block Item
     */
    removeFromCart(item: BlockInCart): void {
        const itemToRemove = this.cart.find(cartItem => cartItem.blockId === item.blockId);
        if (!itemToRemove) {
            throw new Error('Cannot remove item from the cart as id was not found!');
        }
        if (itemToRemove.amount > 1) {
            this.cart = cartListWithUpdatedAmount(this.cart, item.blockId, decrease);
        } else {
            this.cart = this.cart.filter(cartItem => cartItem.blockId !== item.blockId);
        }
    }

    balanceOut(removeCredits: number): void {
        this.userCredits -= removeCredits;
        this.cart = [];
    }

    toggleCart(): void {
        this.cartInMobileView = !this.cartInMobileView;
    }
}
</script>

<style>
:root {
  --radius: 3px;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
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
    text-align: right;
}

img {
    height: 1.5rem;
}

.pointer {
    cursor: pointer
}

.blockGrid {
    width: 70vw;
    height: 85vh;
    overflow: scroll;
    border-radius: var(--radius);
    background: #f5f8ff;
}

.blockItem {
    width: 200px;
    height: 180px;
    background: #c9dcff;
}

.blockItem_credits {
    max-width: 50%;
}

.blockItem_text {
    max-height: 2em;
}

.cart {
    height: 80%;
    width: 25%;
    overflow: scroll;
    border-radius: var(--radius);
    background: #e2ecfd;
}

.cart--mobileView {
    position: absolute;
    top: 12vh;
    width: 95%;
    max-width: 400px;
}

</style>
