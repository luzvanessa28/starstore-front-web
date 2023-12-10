import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uri: string = "https://api.escuelajs.co/api/v1/users";

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  public add(user: Object) {
    return this.http.post(this.uri, user, { headers: this.httpHeaders });
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.uri);
  }

  public getById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.uri}/${id}`);
  }

  public deleteUser(id: number) {
    return this.http.delete(`${this.uri}/${id}`, { headers: this.httpHeaders });
  }

  public updateUser(id: number, user: Object) {
    return this.http.put(`${this.uri}/${id}`, user, { headers: this.httpHeaders });
  }
}
