import { Component, ElementRef, Input } from '@angular/core';
import { BookingService } from '../../../services/booking/booking.service';
import { Modal } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-booking',
  standalone: true,
  imports: [],
  templateUrl: './delete-booking.component.html',
  styleUrl: './delete-booking.component.css'
})
export class DeleteBookingComponent {

  @Input() bookingId: number = 0
  deleteModalElement: HTMLElement | null = null;

  constructor(private bookingService: BookingService, private elementRef: ElementRef, private router: Router) {}

  ngAfterViewInit(): void {
    this.deleteModalElement = this.elementRef.nativeElement.querySelector('#delete-modal')
  }

  closeModal() {
    const deleteModal = new Modal(this.deleteModalElement)
    deleteModal.hide()
  }

  onBookingDelete(bookingId:number) {
    try {
      this.bookingService.deleteBooking(bookingId).subscribe((response:any) => {
        console.log(response)
  
        if (response.isDeleted) {
          this.closeModal()
          // TODO: refresh component/page
          //this.router.navigate([this.router.url])
        }
      })
    } catch (error) {
      console.log("Error deleting booking:", error)
    }
  }
}
