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
    private http : HttpClient
  ) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.uri)
  }

  public addUser(user: object) {
    console.log("service method addUser")
    return this.http.post(this.uri, user, {headers: this.httpHeaders})
  }

  public getById(id: number): Observable<IUser> {
    console.log("funcion getById service")
    return this.http.get<IUser>(`${this.uri}/${id}`)
  }
}
