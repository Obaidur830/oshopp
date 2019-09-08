import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
// tslint:disable-next-line: no-input-rename
@Input('product') product: Product;
// tslint:disable-next-line: no-input-rename
@Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  getQuantity() {
    if (!this.shoppingCart) { return 0; }
   // console.log(this.shoppingCart.items.key);
    const item = this.shoppingCart.items[this.product.key];
    // tslint:disable-next-line: no-debugger
    return item ? item.quantity : 0;
  }


}
