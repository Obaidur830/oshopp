import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/products';
import 'rxjs/add/operator/take';
import { Item } from './models/Item';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  getCart(): Observable<ShoppingCart> {
    const cartId = this.getOrCreateCartId();
    // tslint:disable-next-line: comment-format
    //console.log(this.db.object('/shopping-carts/' + cartId));
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .map(( x: ShoppingCart) => {
       // console.log(x);
        return new ShoppingCart(x.items);
      });
  }
  addToCart(product: Product ) {
    this.updateItem(product, 1);
  }
  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  clearCart() {
    const cardId = this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cardId + '/items').remove();
  }

  create() {
    return this.db.list('/shopping-carts').push({
       dateCreated: new Date().getTime()
    });
  }

 private getItem( cartId: string, productId: string) {
  return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
 }
  private getOrCreateCartId() {
    const cartId = localStorage.getItem('cardId');
    if (cartId) {return cartId; }
    const result =  this.create();
    localStorage.setItem('cardId', result.key);
    return result.key;
  }

  updateItem(product, change: number) {
    const cartId = this.getOrCreateCartId();

    const item$ = this.getItem(cartId, product.key);  // this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    item$.valueChanges().take(1).subscribe((item: Item) => {
       //let quantity = (item.quantity || 0) + change;
       if (item && item.quantity + change === 0) {item$.remove(); } else {
         item$.update({
           title: product.title,
           imageUrl: product.imageUrl,
           price: product.price,
           quantity: item ? item.quantity + change : 1
          });
       }
    });
  }
}
