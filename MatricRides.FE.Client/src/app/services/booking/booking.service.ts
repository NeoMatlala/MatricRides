import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingDto } from '../../models/bookingDto';
import { Observable } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';
declare const Stripe: () => any

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  stripePromise: Promise<any> | undefined

  constructor(private http: HttpClient) {
    this.init()
  }

  async init() {
    this.stripePromise = loadStripe('pk_test_51Oevw8Akocj1NhM2cNSKeekY40NGbu72Xhya9vpOutg6257GxdwzshLB0Yi4j7lkLXcgjfgpTTFc9aZ4jZuWuFdV00lpoGm4V1');
  }

  public getSessionId(sessionIdDto: any): void {
    this.http.post<any>("https://localhost:7101/api/Booking/get-stripe-sessionId", sessionIdDto).subscribe((response:any) => {
      console.log(response)

      this.redirectToCheckout(response.sessionId)
    })
  }

  async redirectToCheckout(sessionId: string){

    const stripe = await this.stripePromise

    stripe.redirectToCheckout({
      sessionId: sessionId
    })
  }

  public makeBooking(booking: BookingDto): Observable<BookingDto> {
    return this.http.post<BookingDto>("https://localhost:7101/api/Booking/make-booking", booking)
  }

  public getCLientBookings(clientEmail: string): Observable<any> {
    return this.http.get(`https://localhost:7101/api/Booking/get-client-bookings/${clientEmail}`)
  }
}

