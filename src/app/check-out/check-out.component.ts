import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  cart: ShoppingCart;
  subcription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService) { }
  ngOnInit() {
    this.subcription = this.shoppingCartService.getCart().subscribe(cart => this.cart = cart);
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
