<template>
<div class="cart m-2 d-flex flex-column text-align-center">
    <div v-if=checkoutAlertMessage>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            {{ checkoutAlertMessage }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    <div class="p-2">CART:</div>
    <div v-for="(item, index) in itemsInCart"
         :key="`${item.id}-${index}`"
         class="card p-2 m-1 justify-content-between"
         data-test-the-cart="item">
        <div class="card-body p-1">
            {{ item.name }}
        </div>
        <div class="d-flex justify-content-between m-2">
            <strong>{{ item.credits }} c</strong>
            <div><small>Amount:</small> {{ item.amount }}
                <span class="badge rounded-pill bg-secondary"
                      data-test-the-cart="removeItem"
                      @click="removeItem(item)">
                    -
                </span>
            </div>
        </div>
    </div>
    <div class="mt-auto p-2">
        <div data-test-the-cart="total">Total: {{itemsInCartTotalCredits}}</div>
        <div>
            <button class="btn btn-primary mb-2"
                    @click="checkout"
                    variant="primary"
                    :disabled="!itemsInCart.length"
                    data-test-the-cart="buy">Buy now</button>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { BlockInCart } from '@/types';

@Component
export default class TheCart extends Vue {
    @Prop({ type: Array, default: () => ([]) }) private readonly itemsInCart!: Array<BlockInCart>;
    @Prop({ type: Number, default: 0 }) private readonly credits!: number;

    private checkoutAlertMessage: string | null = null;

    get itemsInCartTotalCredits(): number {
        return this.itemsInCart.reduce((prev, curr) => { return prev + (curr.credits * curr.amount); }, 0);
    }

    /** A guard when to update user alert.
     * A toast could be implemented for that
    */
    @Watch('itemsInCart')
    cartUpdates(): void{
        this.checkoutAlertMessage = null;
    }

    removeItem(item: BlockInCart): void {
        this.$emit('removeItem', item);
    }

    checkout(): void {
        if (this.itemsInCartTotalCredits > this.credits) {
            this.checkoutAlertMessage = 'You do not have sufficient credits.';
            throw new Error(this.checkoutAlertMessage);
        } else {
            this.$emit('checkout', this.itemsInCartTotalCredits);
        }
    }
}

</script>
