import { Component } from '@angular/core';
import { BookingService } from '../../../../services/booking/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {

  bookings: any = {}

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    const userEmail = localStorage.getItem('userEmail')

    try {
      this.bookingService.getCLientBookings(userEmail!).subscribe((response:any) => {
        //console.log(response)

        this.bookings = response
      })
    } catch (error) {
      console.log("Error getting booking",error)
    }
  }
}
