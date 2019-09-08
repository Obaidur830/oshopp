import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit{
 appUser: AppUser;
 shoppingCartItemCount: number;
 cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    //auth.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  logout() {

   this.auth.logout();

  }
  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = this.shoppingCartService.getCart();
    // this.shoppingCartService.getCart()
    // .subscribe((cart: ShoppingCart) => {
    //     this.shoppingCartItemCount = 0;
    //     // tslint:disable-next-line: forin
    //     for (const productId in cart.items) {
    //      this.shoppingCartItemCount += cart.items[productId].quantity;
    //     }
    // });
  }


}
