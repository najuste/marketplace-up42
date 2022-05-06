<template>
<div class="blockGrid">
    <div class="d-inline-flex flex-wrap justify-content-between mb-4">
        <div v-for="blockItem in blocks"
             :key="blockItem.id"
             class="card blockGrid_item">
            <div class="card-body d-flex flex-column justify-content-between">
                <p class="card-description text-start">{{ blockItem.name }}</p>
                <strong class="text-end">{{ blockItem.credits }} credits</strong>
                <button class="btn-sm btn-primary mb-2"
                        @click="addToCart(blockItem)">Add to cart</button>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Block } from '@/types';

@Component({
    components: {
    }
})
export default class BlockGrid extends Vue {
    @Prop({ type: Array, default: () => ([]) }) private readonly blocks!: Array<Block>;

    addToCart(blockItem: Block): void {
        this.$emit('addToCart', blockItem);
    }
}

</script>
