import { PlacedOrderItem } from './placedOrderItem';

export class PlacedOrder {
    datePlaced: Date;
    shipping: {};
    items: PlacedOrderItem[] = [];
    userId: string;
    // getTotalPrice() {
    //     let sum = 0;
    //     // tslint:disable-next-line: prefer-for-of
    //     for ( let i = 0; i < this.items.length; i++) {
    //         sum = sum + (this.items[i].totalPrice);
    //     }
    //     return sum;
    // }
}