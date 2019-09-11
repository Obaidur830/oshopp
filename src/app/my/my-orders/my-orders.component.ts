import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { OrderService } from 'src/app/order.service';
import { Subscription } from 'rxjs';
import { PlacedOrders } from 'src/app/models/placedOrders';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders = {};
  subscription: Subscription;
  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
   }
  ngOnInit() {
    this.subscription = this.authService.user$
       .switchMap(u => this.orderService.getOrdersByUser(u.uid))
        .subscribe(orders => this.orders = orders);
  }
  ngOnDestroy() {
     this.subscription.unsubscribe();
  }

}
