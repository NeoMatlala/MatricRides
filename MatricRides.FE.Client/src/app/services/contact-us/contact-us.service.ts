import { Injectable } from '@angular/core';
import { ContactUs } from '../../models/contact-us';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) { }

  public contactUs(contactForm: ContactUs): Observable<ContactUs> {
    return this.http.post<ContactUs>("https://localhost:7101/api/ContactUs/send-message", contactForm)
  }
}
