import { Component, ElementRef } from '@angular/core';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { CommonModule } from '@angular/common';
import { ViewBookingModalComponent } from '../../../modals/view-booking-modal/view-booking-modal.component';
import { Modal } from 'flowbite';
import { BookingService } from '../../../../services/booking/booking.service';

@Component({
  selector: 'app-bookings-landing',
  standalone: true,
  imports: [CommonModule, ViewBookingModalComponent],
  templateUrl: './bookings-landing.component.html',
  styleUrl: './bookings-landing.component.css'
})
export class BookingsLandingComponent {

  hostEmail: any = ''
  bookings: any = {}
  selectedBookingId: number = 0
  viewBookingModalElement: HTMLElement | null = null;
  booking: any = {}

  constructor(private hostService: HostApplicationService, private elementRef: ElementRef, private bookingService: BookingService) {}
  
  ngOnInit() {
    this.hostEmail = localStorage.getItem('email')

    try {
      this.hostService.getHost(this.hostEmail).subscribe((response:any) => {
        //console.log(response)
        this.bookings = response.bookings
        console.log(this.bookings)
      })
    } catch (error) {
      console.log("Error getting car count")
    }
  }

  ngAfterViewInit(): void {
    this.viewBookingModalElement = this.elementRef.nativeElement.querySelector('#view-booking-modal')
  }

  viewBooking(bookingId: number) {
    this.bookingService.getBooking(bookingId).subscribe((response: any) => {
      //console.log(response)

      this.booking = response
    })
    
    const viewBookingModal = new Modal(this.viewBookingModalElement)
    viewBookingModal.show()

    // send booking obj to child component

  }
}
