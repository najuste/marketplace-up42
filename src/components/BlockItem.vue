<template>
<div class="card m-2 blockItem">
    <div class="card-body d-flex flex-column justify-content-between">
        <p class="card-description text-start blockItem_text"
           :title="item.name">{{ shortenedName }}</p>
        <div class="mt-auto p-2 d-flex justify-content-end">
            <span class="badge bg-light text-dark blockItem_credits">
                {{ item.credits }} credits
            </span>
        </div>
        <button class="btn btn-primary btn-sm mt-auto p-2"
                data-test-block-item="add"
                @click="addToCart(item)">Add to cart</button>
    </div>
</div>
</template>
<script lang="ts">
import { Block } from '@/types';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PropType } from 'vue';
import { EventBus } from '@/main';

@Component
export default class BlockItem extends Vue {
    @Prop({ type: Object as PropType<Block>, default: () => ({}) }) private readonly item!: Block;

    get shortenedName(): string {
        if (this.item.name.length > 45) {
            return `${this.item.name.slice(0, 45)}...`;
        }
        return this.item.name;
    }

    addToCart(blockItem: Block): void {
        EventBus.$emit('addToCart', blockItem);
    }
}

</script>
