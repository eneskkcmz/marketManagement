import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Aisle } from '../../models/aisle.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AisleService } from '../../services/aisle.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Market } from '../../models/market.model';
import { AisleType } from '../../models/aisleType.model';
import { uuidv4 } from '../../utils/generate-uuid';


@Component({
  selector: 'app-aisle-add',
  standalone: true,
  imports: [FormsModule,NgFor,MatIconModule,MatInputModule,MatFormFieldModule,MatSelectModule,ReactiveFormsModule,AsyncPipe],
  templateUrl: './aisle-add.component.html',
  styleUrl: './aisle-add.component.scss'
})
export class AisleAddComponent {
  
  aisleForm!: FormGroup;
  aisleTypes!:Observable<AisleType[]>;
  selectedAisleType: string = '';
  aisles!:Observable<Aisle[]>;
  marketName="";

  constructor(
    public dialogRef: MatDialogRef<AisleAddComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {market:Market,lastAisle:Aisle},
    private aisleService:AisleService
  ) {

    this.marketName = this.data.market.name;

    const addAisleName = "R" + (Number(this.data.lastAisle.name.substring(1))+1)

    this.aisleForm = this.fb.group({
      id: [uuidv4()],
      name: [addAisleName],
      typeID: [''],
      marketID:[this.data.market.id]
    });

    this.aisleTypes= this.aisleService.getAisleTypes()
  }

  onAddAisle(): void {
    // if (this.selectedAisleType) {65
    //   const newAisle: Aisle = {
    //     id: this.uuidv4(),
    //     name: `R${this.data.currentAisleCount + 1}`,
    //     type: this.selectedAisleType,
    //     marketName:this.data.marketName
    //   };
    //   console.log("asdasda")

    //   this.aisleService.addAisle(newAisle);

    //   this.dialogRef.close(newAisle);
    // } else {
    //   alert('Lütfen bir reyon türü seçiniz!');
    // }


    if(this.aisleForm.valid){

      this.aisleService.addAisle(this.aisleForm.value).subscribe(()=>{
        this.dialogRef.close(this.aisleForm.value);
      });
      
    }else{
      alert('Lütfen bir reyon türü seçiniz!');
    }



  }

  onCancel(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.aisleForm.valid) {
      console.log(this.aisleForm.value);
      this.dialogRef.close(this.aisleForm.value);
    }
  }



}
