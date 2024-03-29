import { CartItem } from './types';

export function cartListWithUpdatedAmount(
    cartList: Array<CartItem>,
    itemId: string,
    operation: (amount: number) => number
): Array<CartItem> {
    return cartList.map((cartItem) => {
        return cartItem.blockId !== itemId ? cartItem : { ...cartItem, amount: operation(cartItem.amount) };
    });
}

export function increase(amount: number): number {
    return amount + 1;
}

export function decrease(amount: number): number {
    return amount - 1;
}
