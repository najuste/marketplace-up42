<template>
<div class="cart">
    <div class="d-flex felx-column">
        CART:
        <div>Balance: <span>{{balance}}</span></div>
        <b-card v-for="(item, index) in itemsInCart"
                :key="`${item.id}-${index}`"
                :title="item.name"
                class="block-item">
            <b-card-text>
                {{ item.description }}
                coins: {{ item.credits }}
            </b-card-text>
            <b-button @click="removeItem(item)" variant="outline-primary">Remove</b-button>
        </b-card>
    </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BlockItemType } from '@/types'

@Component({
    components: {
    }
})
export default class Cart extends Vue {
    @Prop({ type: Array, default: () => ([]) }) private readonly itemsInCart!: Array<BlockItemType>;
    @Prop({ type: Number, default: 0 }) private readonly credits!: number;

    get balance() {
        return this.credits - this.itemsInCart.reduce((prev, curr) => { return prev + curr.credits }, 0)
    }

    removeItem(item: BlockItemType): void {
        this.$emit('removeFromCart', item)
    }
}

</script>
