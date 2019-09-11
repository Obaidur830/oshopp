import { Item } from './Item';
import { Product } from './products';

export class ShoppingCart {
     items: Item[] = [];
     constructor(public itemsMap: {[productId: string]: Item}) {
       this.itemsMap = itemsMap || {};
     // console.log(this.itemsMap);
         // tslint:disable-next-line: forin
       for (const productId in itemsMap) {
           const item = itemsMap[productId];
          //  const x = new Item();
          //  Object.assign(x, item);
          //  x.key = productId;
           this.items.push(new Item({ ...item, key: productId }));
        }
     }

    //  get productIds() {
    //      return Object.keys(this.items);
    //  }
     getQuantity(product: Product) {
      // if (!this.shoppingCart) { return 0; }
     // console.log(this.shoppingCart.items.key);
      const item = this.itemsMap[product.key];
      // tslint:disable-next-line: no-debugger
      return item ? item.quantity : 0;
    }

     get totalPrice() {
         let sum = 0;
        // tslint:disable-next-line: forin
         for (const productId in this.items) {
           sum = sum + (this.items[productId].totalPrice) ;
          }
         return sum;
     }
     get totalItemsCount() {
         let count = 0;
         // tslint:disable-next-line: curly
         // tslint:disable-next-line: prefer-const
         // tslint:disable-next-line: forin
         for (const productId in this.items) {
           count += this.items[productId].quantity;
         }
         return count;
     }
}
