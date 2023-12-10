import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { Category } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private uri: string = "https://api.escuelajs.co/api/v1/categories";

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.uri);
  }

  public getById(id:number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.uri}/${id}`);
  }

  public deleteCategory(id: number) {
    return this.http.delete(`${this.uri}/${id}`, { headers: this.httpHeaders });
  }

  public addCategory(category: object) {
    return this.http.post(this.uri, category, { headers: this.httpHeaders });
  }

  public updateCategory(id: number, category: Object) {
    return this.http.put(`${this.uri}/${id}`, category, { headers: this.httpHeaders });
  }
}
