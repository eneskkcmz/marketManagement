import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
 
  private searchSubject = new BehaviorSubject<string>(''); 
  
  setSearchTerm(term: string): void {
    this.searchSubject.next(term);
  }

  getSearchTerm(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  getProducts(aisleID: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?aisleID=${aisleID}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  editProduct(id:number,product:any):Observable<any>{
    return this.http.put<any>(this.apiUrl+"/"+id,product)
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
