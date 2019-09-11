import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { PlacedOrders } from './models/placedOrders';
import { PlacedOrderItem } from './models/placedOrderItem';
import { Observable } from 'rxjs';
import { PlacedOrderItemProduct } from './models/placedOrderItemproduct';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }
  placeOrder(order) {
    const result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

   getOrders(): Observable <PlacedOrders> {
     return this.db.list('/orders').valueChanges()
       // tslint:disable-next-line: max-line-length
       .map((x: [{ datePlaced: Date, shipping: {}, items: [{product: PlacedOrderItemProduct, quantity: number, totalPrice: number}], userId: string}]) => {
         //console.log(x.values);
         return new PlacedOrders(x);
       });
  }

   getOrdersByUser(userId: string): Observable<PlacedOrders> {
    return this.db.list('/orders',
       ref => ref.orderByChild('userId').equalTo(userId)).valueChanges()
        .map((x: [{ datePlaced: Date, shipping: {}, items: [{product: PlacedOrderItemProduct, quantity: number, totalPrice: number}],
           userId: string }]) => {
          return new PlacedOrders(x);
        });
  }
}
