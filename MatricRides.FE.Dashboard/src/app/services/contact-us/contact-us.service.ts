import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) { }

  public getAllMessages() : Observable<any> {
    return this.http.get("https://localhost:7101/api/ContactUs/get-messages")
  }

  public getUnreadMessages() : Observable<any> {
    return this.http.get("https://localhost:7101/api/ContactUs/unread-messages")
  }

  public getMessage(id: number) : Observable<any> {
    return this.http.get(`https://localhost:7101/api/ContactUs/get-message/${id}`)
  }
}
