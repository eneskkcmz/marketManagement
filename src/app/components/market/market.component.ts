import { Component, Input, OnInit, Output } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { AisleService } from '../../services/aisle.service';
import { Market } from '../../models/market.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Aisle } from '../../models/aisle.model';
import { AisleAddComponent } from '../aisle-add/aisle-add.component';
import { AisleComponent } from "../aisle/aisle.component";
import { ProductComponent } from "../product/product.component";
import { first, firstValueFrom, forkJoin, lastValueFrom, map, mergeMap, Observable, shareReplay, takeLast } from 'rxjs';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [NgFor, AisleComponent, ProductComponent, AsyncPipe,NgIf],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent implements OnInit {

  aisles!: Observable<Aisle[]>;
  aisle!: Aisle;
  @Input()
  market!: Market;
  isVisible: boolean = false;


  constructor(private dialog: MatDialog, private aisleService: AisleService) { }
  ngOnInit(): void {
    this.init();
  }


  init() {

    this.aisles = forkJoin({
      aisles: this.aisleService.getAislesByMarketId(this.market.id),
      aisleTypes: this.aisleService.getAisleTypes()
    }).pipe(
      map(({ aisles, aisleTypes }) =>
        aisles.map(aisle => {
          const aisleType = aisleTypes.find(type => type.id === aisle.typeID);

          return {
            id: aisle.id,
            name: aisle.name,
            typeID: aisle.typeID,
            marketID: aisle.marketID,
            typeName: aisleType?.name
          };
        })
      )
    );
  }

  isVisibleHandle(event:boolean){
    console.log(event)
      this.isVisible = event
  }


  async getLastAisle(): Promise<any> {
    const largestItem = await firstValueFrom(
      this.aisles.pipe(
        map(array => array.reduce((max, item) => item.id > max.id ? item : max))
      )
    );
    return largestItem;
  }


  async openAisleAddDialog() {
    const marketID = this.market;
    const lastAisle = (await this.getLastAisle());
    const dialogRef = this.dialog.open(AisleAddComponent, {
      data: { market: this.market, lastAisle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.init();
      }
    });
  }

}

