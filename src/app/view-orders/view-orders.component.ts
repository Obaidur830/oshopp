import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('orders') orders = {};
  currentViewOrder = {};
  constructor() { }

  ngOnInit() {
  }

  showItemsSummary(order) {
    this.currentViewOrder = order;
  }

}
