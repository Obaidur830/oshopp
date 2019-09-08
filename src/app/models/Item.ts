import { Product } from './products';

export class Item {
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;


    constructor(init?: Partial<Item>) {
        Object.assign(this, init);
    }
    get totalPrice() {
       return this.price * this.quantity;
    }
}
