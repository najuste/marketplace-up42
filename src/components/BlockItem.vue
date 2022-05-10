<template>
<div class="card mb-2 blockItem">
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
                @click="addToCart">Add to cart</button>
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

    // TODO create ellipsis as title would show all name
    get shortenedName(): string {
        return this.item.name;
    }

    addToCart(blockItem: Block): void {
        EventBus.$emit('addToCart', blockItem);
    }
}

</script>
