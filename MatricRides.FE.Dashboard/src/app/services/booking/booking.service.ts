import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bookingFilter } from '../../models/booking-filter';

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

  public bookingsFilter(bookingFilterDto: bookingFilter):Observable<any> {
    return this.http.post("https://localhost:7101/api/Booking/bookings-filter", bookingFilterDto)
  }

  public filterCompleteBookings(carId: number):Observable<any> {
    return this.http.get<any>(`https://localhost:7101/api/Booking/complete-bookings?carId=${carId}`)
  }
  public filterBookedBookings(carId: number):Observable<any> {
    return this.http.get<any>(`https://localhost:7101/api/Booking/booked-bookings?carId=${carId}`)
  }
  public filterInProgressBookings(carId: number):Observable<any> {
    return this.http.get<any>(`https://localhost:7101/api/Booking/in-progress-bookings?carId=${carId}`)
  }
}
