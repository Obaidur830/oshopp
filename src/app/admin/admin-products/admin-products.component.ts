import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';
import { DataTableResource } from 'angular5-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit , OnDestroy {
   products: Product[];
   subscription: Subscription;
   tableResource: DataTableResource<Product>;
   items: Product[] = [];
   itemCount: number;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
         this.products = products as Product[];
         this.initializeTable(this.products);


        });

  }
initializeTable(products: Product[]) {
     this.tableResource = new DataTableResource(products);
     this.tableResource.query({offset : 0})
      .then(items => this.items = items);
     this.tableResource.count()
     .then(count => this.itemCount = count);
}
reloadItems(param) {
  if (!this.tableResource) { return; }
  this.tableResource.query(param)
      .then(items => this.items = items);
}
filter(query: string) {
    let filteredProducts = (query) ?
     this.products.filter(P => P.title.toLowerCase().includes(query.toLowerCase())) :
     this.products;
    this.initializeTable(filteredProducts);
  }

ngOnInit() {

  }
ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
