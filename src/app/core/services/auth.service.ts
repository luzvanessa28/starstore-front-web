import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uri: string = "https://api.escuelajs.co/api/v1/auth/login";

  private httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  constructor(
    private http: HttpClient
  ) { }

  public login(credentials: Object) {
    return this.http.post(this.uri, credentials, { headers: this.httpHeaders });
  }
}
