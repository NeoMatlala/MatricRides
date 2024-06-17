import { Component, ElementRef } from '@angular/core';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { CommonModule } from '@angular/common';
import { ViewBookingModalComponent } from '../../../modals/view-booking-modal/view-booking-modal.component';
import { Modal } from 'flowbite';
import { BookingService } from '../../../../services/booking/booking.service';
import { bookingFilter } from '../../../../models/booking-filter';

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
  showDropDown: boolean = false
  carId: number = 0
  bookingFilterDto: bookingFilter = {
    carId: 0,
    status: ''
  }

  constructor(private hostService: HostApplicationService, private elementRef: ElementRef, private bookingService: BookingService) {}
  
  ngOnInit() {
    this.hostEmail = localStorage.getItem('email')

    try {
      this.hostService.getHost(this.hostEmail).subscribe((response:any) => {
        
        this.bookings = response.bookings
        this.carId = response.hostObj.cars[0].carId
        console.log(this.carId)
      })
    } catch (error) {
      console.log("Error getting car count")
    }
  }

  ngAfterViewInit(): void {
    this.viewBookingModalElement = this.elementRef.nativeElement.querySelector('#view-booking-modal')
  }

  showdropdown() {
    this.showDropDown = !this.showDropDown
  }

  allBookings() {
    this.bookings = {}
    try {
      this.hostService.getHost(this.hostEmail).subscribe((response:any) => {
        
        this.bookings = response.bookings
      })
    } catch (error) {
      console.log("Error getting car count")
    }

    this.showDropDown = !this.showDropDown
  }

  bookingsFilter(status: string) {
    this.bookings = {}

    this.bookingFilterDto.carId = this.carId
    

    if(status == 'complete') {
      this.bookingFilterDto.status = 'complete'
    } else if(status == 'booked') {
      this.bookingFilterDto.status = 'booked'
    } else if(status == 'in-progress') {
      this.bookingFilterDto.status = 'in-progress'
    }

    try {
      this.bookingService.bookingsFilter(this.bookingFilterDto).subscribe((response:any) => {
        
        this.bookings = response
      })
    } catch (error) {
      console.log("Error with complete filter", error)
    }

    this.showDropDown = !this.showDropDown
  }

  viewBooking(bookingId: number) {
    this.bookingService.getBooking(bookingId).subscribe((response: any) => {
      this.booking = response
    })
    
    const viewBookingModal = new Modal(this.viewBookingModalElement)
    viewBookingModal.show()
  }
}
