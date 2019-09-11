import { PlacedOrderItem } from './placedOrderItem';

export class PlacedOrder {
    datePlaced: Date;
    shipping: {};
    items: PlacedOrderItem[];
    userId: string;
}