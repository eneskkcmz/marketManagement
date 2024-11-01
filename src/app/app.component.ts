import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MarketComponent } from "./components/market/market.component";
import { CurrencyRateComponent } from "./components/currency-rate/currency-rate.component";
import { MarketService } from './services/market.service';
import { Observable } from 'rxjs';
import { Market } from './models/market.model';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, MarketComponent, CurrencyRateComponent,NgFor,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  markets!: Observable<Market[]>;
  constructor(private marketService:MarketService){}

  title = 'market-management';

  ngOnInit(): void {
    this.markets =  this.marketService.getMarkets();
  }

  onSave(){}
}
