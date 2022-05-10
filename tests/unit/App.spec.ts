import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import TheCart from '@/components/TheCart.vue';
import BlockGrid from '@/components/BlockGrid.vue';
import BlockItem from '@/components/BlockItem.vue';
import 'whatwg-fetch';

describe('App.vue', () => {
    it('mounts and renders BlockGrid and TheCart but not Block Item', () => {
        const wrapper = shallowMount(App, {});
        expect(wrapper.text()).toContain('Credits');
        expect(wrapper.findComponent(TheCart).exists()).toBeTruthy();
        expect(wrapper.findComponent(BlockGrid).exists()).toBeTruthy();
        expect(wrapper.findComponent(BlockItem).exists()).toBeFalsy();
    });
});
