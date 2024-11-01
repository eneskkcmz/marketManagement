import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { forkJoin, map, Observable } from 'rxjs';
import { Aisle } from '../../models/aisle.model';
import { AisleService } from '../../services/aisle.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { uuidv4 } from '../../utils/generate-uuid';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Market } from '../../models/market.model';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [MatIconModule,MatInputModule, MatFormFieldModule,MatSelectModule,ReactiveFormsModule,NgFor ,NgIf,AsyncPipe,FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {


  currentProduct!: Product;
  currentAisle!:Aisle;
  selectedAisle!:Aisle;
  selectedMarket!:Market;
  markets!:Observable<Market[]>;
  aisles!:Aisle[];
  currentProductName!:string;
  isInit = false;

  constructor(
    private dialogRef: MatDialogRef<ProductEditComponent>,
    private fb: FormBuilder,
    private aisleService:AisleService,
    private productService:ProductService,
    private marketService:MarketService,
    @Inject(MAT_DIALOG_DATA) public data: {product:Product }
  ) {
    this.currentProduct = this.data.product;
    this.currentProductName = this.currentProduct.name;
  }
  ngOnInit(): void {
    this.markets = this.marketService.getMarkets();



    forkJoin({
      aisle: this.aisleService.getAislesByID(this.currentProduct.aisleID),
      markets:this.markets
    }).pipe(
      map(({ aisle, markets }) =>{
        this.currentAisle = aisle[0];
        this.selectedAisle = aisle[0];
        this.selectedMarket = markets.filter(x=>x.id = this.selectedAisle.marketID)[0]
        
      }
      )
    ).subscribe(()=>{
      this.isInit = true;
      this.aisleService.getAislesByMarketId(this.selectedMarket.id).subscribe(data=>{
        this.aisles =  data.filter(x=>x.typeID == this.currentAisle.typeID)
       })
    });


  }

  marketChange(event:any){
    console.log(event);
     this.aisleService.getAislesByMarketId(event.value).subscribe(data=>{
      this.aisles =  data.filter(x=>x.typeID == this.currentAisle.typeID)
     })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    const editProduct = {
      name:this.currentProductName,
      aisleID:this.selectedAisle.id
    }
    
      this.productService.editProduct(this.currentProduct.id,editProduct).subscribe(()=>{
        const editAisle = {
          name:this.selectedAisle.name,
          typeID:this.selectedAisle.typeID,
          marketID:this.selectedMarket.id
        }
        this.aisleService.updateAisle(this.selectedAisle.id,editAisle).subscribe(()=>{
          this.dialogRef.close(editProduct);
        })

      })
     
    }
  
    deleteProduct() {
      this.productService.deleteProduct(this.currentProduct.id).subscribe(() => {
        this.dialogRef.close({ deleted: true });
      });
    }

}