export interface Block {
    id: string
    name: string,
    credits: number,
}

export interface CartItem {
    blockId: string,
    amount: number,
}

export interface BlockInCart extends CartItem {
    name: string,
    credits: number,
}

export interface ApiReturnType {
    data: Array<unknown>,
    error: Array<unknown>,
}
