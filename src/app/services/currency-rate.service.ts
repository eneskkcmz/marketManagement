import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrencyRateService {
  private apiUrl = 'https://api.fastforex.io/fetch-one';
  private apiKey = '3c725539ec-e9f23b083f-sm9hkk';

  constructor(private http: HttpClient) {}

  fetchCurrencyRates(): Observable<any[]> {
    const currencies = ['USD','GBP','EUR'];
    const requests = currencies.map(currency => 
      this.http.get(`${this.apiUrl}?from=${currency}&to=TRY&api_key=${this.apiKey}`).pipe(
        map((response: any) => ({
          currency: currency,
          value: response.result.TRY.toFixed(4)
        }))
      )
    );

    return forkJoin(requests);
  }
}
