import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
 // tslint:disable-next-line: no-input-rename
 @Input('cart')cart: ShoppingCart;
  shipping = {};
  userSubscription: Subscription;
  userId: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.placeOrder(order)
       .then(result => this.router.navigate(['/order-success', result.key]) );
   }

}
