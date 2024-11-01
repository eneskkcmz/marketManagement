import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Market } from '../../models/market.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input()
  product!: Product;

  constructor(private dialog: MatDialog) { }


  openProductEditDialog() {
    const dialogRef = this.dialog.open(ProductEditComponent,{
      data: { product:this.product}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
        // this.products = this.productService.getProducts(this.aisle.id);
      }
    });
  }

}
