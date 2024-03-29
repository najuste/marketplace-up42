import { shallowMount } from '@vue/test-utils';
import BlockGrid from '@/components/BlockGrid.vue';
import BlockItem from '@/components/BlockItem.vue';
import { Block } from '@/types';

describe('BlockGrid.vue', () => {
    const items: Array<Block> = [{ id: '123', name: 'Very valuable block', credits: 1000 },
        { id: '223', name: 'Awesome big block', credits: 200 }];

    it('mounts', () => {
        const wrapper = shallowMount(BlockGrid, {});
        expect(wrapper.vm).toBeDefined();
    });
    it('renders block items if items are passed', () => {
        const wrapper = shallowMount(BlockGrid, {
            propsData: { items }
        });
        expect(wrapper.findAllComponents(BlockItem).length).toBe(2);
    });
});
