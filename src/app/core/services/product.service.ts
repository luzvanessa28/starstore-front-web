import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private uri: string = "https://api.escuelajs.co/api/v1/products";

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.uri);
  }

  public getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.uri}/${id}`)
  }

  public delete(id: number) {
    return this.http.delete(`${this.uri}/${id}`);
  }

  public addProduct(product: object) {
    return this.http.post(this.uri, product, { headers: this.httpHeaders })
  }

  public updateProduct(id: number, producto: Object) {
    return this.http.put(`${this.uri}/${id}`, producto, { headers: this.httpHeaders });
  }
}
