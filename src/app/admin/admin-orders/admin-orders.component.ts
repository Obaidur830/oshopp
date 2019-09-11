import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { Subscription } from 'rxjs';
import { PlacedOrders } from 'src/app/models/placedOrders';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders = {};
  subscription: Subscription;
  constructor(private orderService: OrderService ) {
  }
  ngOnInit() {
    this.subscription = this.orderService.getOrders().subscribe(orders => this.orders = orders);

  }
  ngOnDestroy() {
     this.subscription.unsubscribe();
  }
 
}
