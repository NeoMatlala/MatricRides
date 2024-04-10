import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUser } from '../models/login-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // login
  public login(user:loginUser): Observable<loginUser>{
    return this.http.post<loginUser>("https://localhost:7101/api/Auth/login", user)
  }
}
