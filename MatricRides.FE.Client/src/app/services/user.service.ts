import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from '../models/create-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // create account, client role
  public createAccount(user: CreateUser): Observable<CreateUser>{
    return this.http.post<CreateUser>("https://localhost:7101/api/Auth/register", user)
  }
}
