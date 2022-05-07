<template>
<div class="cart d-flex flex-column text-align-center">
    <div class="p-2">CART:</div>
    <div v-for="(item, index) in itemsInCart"
         :key="`${item.id}-${index}`"
         class="card p-2 mb-2">
        <div class="card-body p-1">
            {{ item.name }}
        </div>
        <div class="d-flex justify-content-between m-2">
            <strong>{{ item.credits }} c</strong>
            <div><small>Amount:</small> {{ item.ammount }}
                <span class="badge rounded-pill bg-secondary"
                      @click="removeItem(item)">
                    -
                </span>
            </div>
        </div>
    </div>
    <div class="mt-auto p-2">
        <div>Total: {{itemsInCartTotal}}</div>
        <div>
            <button class="btn btn-primary mb-2" @click="checkout" variant="primary">Checkout</button>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { BlockInCart } from '@/types';

@Component({
    components: {
    }
})
export default class Cart extends Vue {
    @Prop({ type: Array, default: () => ([]) }) private readonly itemsInCart!: Array<BlockInCart>;
    @Prop({ type: Number, default: 0 }) private readonly credits!: number;

    get itemsInCartTotal(): number {
        return this.itemsInCart.reduce((prev, curr) => { return prev + (curr.credits * curr.ammount); }, 0);
    }

    removeItem(item: BlockInCart): void {
        this.$emit('removeItem', item);
    }

    checkout(): void {
        if (this.itemsInCartTotal > this.credits) {
            const msg = 'You do not have sufficient credits, please update credits first';
            window.alert(msg);
            throw new Error(msg);
        } else {
            this.checkoutItemsWithValue();
        }
    }

    checkoutItemsWithValue(): void {
        this.$emit('checkout', this.itemsInCartTotal);
    }
}

</script>
