import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from '../models/create-user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUser } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this.isLoggedInSubject.asObservable()

  constructor(private http: HttpClient) { }

  // create account, client role
  public login(user: LoginUser): Observable<LoginUser>{
    return this.http.post<LoginUser>("https://localhost:7101/api/Auth/login", user)
      .pipe(
        tap(() => {
          this.setLoggedIn(true)
        })
      )
  }

  public createAccount(user: CreateUser): Observable<CreateUser>{
    return this.http.post<CreateUser>("https://localhost:7101/api/Auth/register", user)
  }

  setLoggedIn(value: boolean) {
    localStorage.setItem('isLoggedIn', value.toString())
    this.isLoggedInSubject.next(value)
  }

  logout() {
    this.setLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }
}
