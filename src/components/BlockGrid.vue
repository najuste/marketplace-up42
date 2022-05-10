<template>
<div class="d-inline-flex flex-wrap justify-content-between">
    <block-item v-for="blockItem in items"
                :key="blockItem.id"
                :item="blockItem"
                @addToCart="addToCart(blockItem)">
    </block-item>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Block } from '@/types';
import BlockItem from './BlockItem.vue';

@Component({
    components: {
        BlockItem
    }
})
export default class BlockGrid extends Vue {
    @Prop({ type: Array, default: () => ([]) }) private readonly items!: Array<Block>;

    addToCart(blockItem: Block): void {
        this.$emit('addToCart', blockItem);
    }
}

</script>
