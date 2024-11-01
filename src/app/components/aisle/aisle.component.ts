import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Aisle } from '../../models/aisle.model';
import { ProductComponent } from "../product/product.component";
import { ProductService } from '../../services/product.service';
import { debounceTime, distinctUntilChanged, forkJoin, map, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProductAddComponent } from '../product-add/product-add.component';
import { MatDialog } from '@angular/material/dialog';
import { AisleService } from '../../services/aisle.service';
import { Market } from '../../models/market.model';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-aisle',
  standalone: true,
  imports: [ProductComponent, NgFor,NgIf, AsyncPipe, ProductEditComponent],
  templateUrl: './aisle.component.html',
  styleUrl: './aisle.component.scss'
})
export class AisleComponent implements OnInit {
  products!: Product[];
  filteredProducts : Product[]=[];
  isVisible: boolean=true

  constructor(private productService:ProductService,private dialog: MatDialog, private aisleService: AisleService) {}

  @Input()
  aisle!: Aisle;

  @Output() 
  isVisibleEvent = new EventEmitter<boolean>();

  aisles!: Observable<Aisle[]>;


  ngOnInit(): void {
    this.productService.getProducts(this.aisle.id).subscribe(data=>{
      this.products = data
    })

    this.productService.getSearchTerm()
    .pipe(
      debounceTime(300),          // 300ms bekleme süresi
      distinctUntilChanged()       // Aynı arama terimi tekrar edilmez
    )
    .subscribe((term: string) => {
      console.log(term)
      this.filterProducts(term); // Filtreleme fonksiyonunu çağır
    });

  }

  filterProducts(term: string): void {
    // Arama terimine göre ürünleri filtreleyin
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    if(this.filteredProducts.length==0){
      this.isVisibleEvent.emit(true)
    }else{
      this.isVisibleEvent.emit(false)
    }


  }


  openProductAddDialog() {
    const dialogRef = this.dialog.open(ProductAddComponent,{
      data: { aisle:this.aisle }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.getProducts(this.aisle.id).subscribe(data=>{
          this.products = data
        })
      }
    });
  }

  

  deleteAisle() {
    this.aisleService.deleteAisle(this.aisle.id).subscribe(() => {
      location.reload()
    });
  }

}