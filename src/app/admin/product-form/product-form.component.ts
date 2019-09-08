import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;
  a;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) { this.productService.get(this.id).take(1).subscribe( p => this.product = p);
     }
  }
save(product) {

    // tslint:disable-next-line: no-debugger
    console.log(product);
    if (this.id) {this.productService.update(this.id, product); }
    // tslint:disable-next-line: one-line
    else { this.productService.create(product); }
    this.router.navigate(['/admin/products']);
  }
  delete() {
    if (!confirm('are sure to delete this product?')) { return; }
    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
  }
  
ngOnInit() {
  }

}
