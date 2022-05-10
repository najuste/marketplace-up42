import { shallowMount } from '@vue/test-utils';
import TheCart from '@/components/TheCart.vue';

describe('TheCart.vue', () => {
    it('mounts and with no props passed renders cart title with total value and disabled button "Buy now"', () => {
        const wrapper = shallowMount(TheCart, {});
        expect(wrapper.text()).toContain('CART');
        expect(wrapper.classes()).toContain('cart');
        expect(wrapper.text()).toContain('Total: 0');
        expect(wrapper.find('[data-test-the-cart="button"]').text()).toEqual('Buy now');
        expect(wrapper.find('[data-test-the-cart="button"]').attributes().disabled).toBe('disabled');
    });

    it('When button "Buy now" is clicked with no items in cart, an error message is shown', async () => {
        const wrapper = shallowMount(TheCart, {});
        await wrapper.find('[data-test-the-cart="button"]').trigger('click');
        expect(wrapper.emitted().checkout).toBeFalsy();
    });

    it('When items in cart, button "Buy now" is not dissabled and when clicked emits a checkout event with value 1000', async () => {
        const wrapper = shallowMount(TheCart, {
            propsData: {
                itemsInCart: [
                    { blockId: '123', name: 'Very valuable block', credits: 1000, amount: 1 }
                ],
                credits: 1000
            }
        });
        expect(wrapper.find('[data-test-the-cart="button"]').attributes().disabled).toBe(undefined);
        await wrapper.find('[data-test-the-cart="button"]').trigger('click');
        expect(wrapper.classes()).not.toContain('toast');
        expect(wrapper.emitted().checkout).toEqual([[1000]]);
    });

    it('When button "Buy now" is clicked with items value over the credit allowance an error is shown', async () => {
        const wrapper = shallowMount(TheCart, {
            propsData: {
                itemsInCart: [
                    { blockId: '123', name: 'Very valuable block', credits: 1000, amount: 1 },
                    { blockId: '223', name: 'Awesome big block', credits: 200, amount: 1 }
                ],
                credits: 1000
            }
        });
        await wrapper.find('[data-test-the-cart="button"]').trigger('click');
        expect(wrapper.emitted().checkout).toBeFalsy();
        expect(wrapper.find('.alert').text()).toEqual('You do not have sufficient credits.');
    });
});
