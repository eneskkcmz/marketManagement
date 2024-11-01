import { Component } from '@angular/core';
import { CurrencyRateService } from '../../services/currency-rate.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currencyRates: any[] = [];

  
  constructor(private currencyRateService: CurrencyRateService, private productService: ProductService) {
    this.updateCurrencyRates();
  }

  updateCurrencyRates(): void {
    this.currencyRateService.fetchCurrencyRates().subscribe(rates => {
      this.currencyRates = rates;
      setTimeout(() => this.updateCurrencyRates(), 30000);
    });
  }

  onSearch(e:any): void {
    this.productService.setSearchTerm(e.target.value); 
  }

  getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      default:
        return '';
    }
  }
  
}
