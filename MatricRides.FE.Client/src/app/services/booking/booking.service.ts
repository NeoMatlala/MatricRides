import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingDto } from '../../models/bookingDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  public makeBooking(booking: BookingDto): Observable<BookingDto> {
    return this.http.post<BookingDto>("https://localhost:7101/api/Booking/make-booking", booking)
  }
}
