import { Component, ElementRef } from '@angular/core';
import { BookingService } from '../../../../services/booking/booking.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'flowbite';
import { DeleteBookingComponent } from '../../../modals/delete-booking/delete-booking.component';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, DeleteBookingComponent],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {

  bookings: any = {}
  deleteModalElement: HTMLElement | null = null;
  bookingId: number = 0

  constructor(private bookingService: BookingService, private elementRef: ElementRef) {}

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

  ngAfterViewInit(): void {
    this.deleteModalElement = this.elementRef.nativeElement.querySelector('#delete-modal')
  }

  showModal(id:number) {
    this.bookingId = id
    const deleteModal = new Modal(this.deleteModalElement)
    deleteModal.show()
  }
}
