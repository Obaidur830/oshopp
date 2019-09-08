import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/products';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];

  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService

      ) {
  }
  ngOnInit() {
    this.cart$ = this.shoppingCartService.getCart(); //.subscribe((cart: ShoppingCart) => this.cart = cart);
    //console.log(this.cart);
    this.populateProduts();
  }
  private populateProduts() {
    this.productService.getAll().switchMap(p => {
      this.products = p as Product[];
      return this.route.queryParamMap;
    })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter( p => p.category === this.category) :
    this.products;
  }

}
