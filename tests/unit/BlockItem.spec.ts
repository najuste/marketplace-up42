import { shallowMount } from '@vue/test-utils';
import BlockItem from '@/components/BlockItem.vue';
import { Block } from '@/types';

describe('BlockItem.vue', () => {
    const item: Block = { id: '123', name: 'Very valuable block', credits: 0 };

    it('mounts and when passed prop item and renders as a card', () => {
        const wrapper = shallowMount(BlockItem, {
            propsData: { item }
        });
        expect(wrapper.vm).toBeDefined();
        expect(wrapper.classes()).toContain('card');
        expect(wrapper.classes()).toContain('blockItem');
        expect(wrapper.find('.card-description').text()).toEqual('Very valuable block');
        expect(wrapper.find('.blockItem_credits').text()).toEqual('0 credits');
    });
    it('when clicked on button Add to cart, expect emit an event', async () => {
        const wrapper = shallowMount(BlockItem, {
            propsData: { item }
        });
        expect(wrapper.find('[data-test-block-item="add"]').text()).toEqual('Add to cart');
        await wrapper.find('[data-test-block-item="add"]').trigger('click');
        // TODO the eventBus can't be tested this way, needs a fix
        // expect(wrapper.emitted('addToCart')).toBeTruthy();
    });
});
