import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUser } from '../models/login-user';
import { Observable, map } from 'rxjs';
import { CreateHostUser } from '../models/create-host';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // login
  public login(user:loginUser): Observable<loginUser>{
    return this.http.post<loginUser>("https://localhost:7101/api/Auth/login", user)
  }

  // create host account
  public createHost(user:CreateHostUser): Observable<CreateHostUser>{
    return this.http.post<CreateHostUser>("https://localhost:7101/api/Auth/register", user)
  }

  public GetUsers(): Observable<any> {
    return this.http.get("https://localhost:7101/api/User/get-users")
  }

  public GetUserCount(): Observable<any> {
    return this.http.get<any[]>("https://localhost:7101/api/User/get-users").pipe(
      map((cars:any) => cars.length)
    )
  }
}
