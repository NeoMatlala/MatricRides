import { Component } from '@angular/core';
import { BookingService } from '../../../../services/booking/booking.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {

  successMessage: string = ''
  constructor( private bookingService: BookingService){}

  ngOnInit() {
    const bookingObject = localStorage.getItem('bookingObject')
    const parsedBooking = bookingObject ? JSON.parse(bookingObject) : null

    this.bookingService.makeBooking(parsedBooking).subscribe((response:any) => {
      console.log(response)

      if(response.isBooked) {
        this.successMessage = response.message

        localStorage.removeItem('bookingObject')
      }
    })
  }
}
