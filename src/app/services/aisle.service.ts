import { Injectable } from '@angular/core';
import { Aisle } from '../models/aisle.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AisleType } from '../models/aisleType.model';

@Injectable({
  providedIn: 'root'
})
export class AisleService {
  private apiUrl = 'http://localhost:3000/aisles';

  constructor(private http: HttpClient) {}

  getAislesByID(id: string): Observable<Aisle[]> {
    return this.http.get<Aisle[]>(this.apiUrl+'?id='+id)
  }


  getAislesByMarketId(marketId: number): Observable<Aisle[]> {
    return this.http.get<Aisle[]>(this.apiUrl+'?marketID='+marketId)
  }

  updateAisle(id:string,aisle:any):any {
    return this.http.put<any>(this.apiUrl+"/"+id,aisle);
  }


  getAisleTypes(): Observable<AisleType[]> {
    return this.http.get<AisleType[]>('http://localhost:3000/aisleTypes');
  }



  addAisle(aisle:Aisle){
    return this.http.post<AisleType[]>('http://localhost:3000/aisles',aisle);
  }

  deleteAisle(aisleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${aisleId}`);
  }
}