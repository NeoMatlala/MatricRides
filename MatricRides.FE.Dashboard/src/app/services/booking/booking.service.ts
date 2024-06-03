import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  public getBooking(bookingId: number):Observable<any> {
    return this.http.get<any>(`https://localhost:7101/api/Booking/get-booking/${bookingId}`)
  }

  public reviewBooking(review: any):Observable<any> {
    return this.http.post<any>("https://localhost:7101/api/Booking/review-booking-application", review)
  }
}
