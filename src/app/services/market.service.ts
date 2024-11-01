import { Injectable } from '@angular/core';
import { Market } from '../models/market.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private apiUrl = 'http://localhost:3000/markets'; 
  private markets: Market[] = []; // Marketler burada tutulacak

  constructor(private http: HttpClient) {}

  getMarkets(): Observable<Market[]> {
    return this.http.get<Market[]>(this.apiUrl);
  }

}
