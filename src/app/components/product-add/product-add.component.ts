import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Aisle } from '../../models/aisle.model';
import { AisleService } from '../../services/aisle.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { uuidv4 } from '../../utils/generate-uuid';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [MatIconModule,MatInputModule, MatFormFieldModule,MatSelectModule,ReactiveFormsModule,NgFor,AsyncPipe],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;
  currentAisle!: Aisle;
  constructor(
    private dialogRef: MatDialogRef<ProductAddComponent>,
    private fb: FormBuilder,
    private aisleService:AisleService,
    private productService:ProductService,
    @Inject(MAT_DIALOG_DATA) public data: {aisle:Aisle },
  ) {
    this.currentAisle = this.data.aisle;
    this.productForm = this.fb.group({
      id: [uuidv4()],
      name: [''],
      aisleID: [this.currentAisle.id]
    });
  }
  ngOnInit(): void {
    
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(()=>{
        this.dialogRef.close(this.productForm.value);
        location.reload()
      })
     
    }
  }
}