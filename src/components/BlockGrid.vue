<template>
<div class="block-grid">
    <div class="d-flex flex-wrap mb-6">
        <b-card v-for="item in items"
                :key="item.id"
                :title="item.name"
                class="block-item">
            <b-card-text>
                {{ item.description }}
                coins: {{ item.credits }}
            </b-card-text>
            <b-button @click="addToCart(item)" variant="primary">Add to cart</b-button>
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
export default class BlockGrid extends Vue {
    @Prop({ type: Array, default: () => ([]) }) private readonly items!: Array<BlockItemType>;

    addToCart(item: BlockItemType): void {
        this.$emit('addToCart', item)
    }
}

</script>
