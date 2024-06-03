import { Component, ElementRef, Input } from '@angular/core';
import { Modal } from 'flowbite';
import { BookingService } from '../../../services/booking/booking.service';
import { CommonModule } from '@angular/common';
import { ReviewBookingDTO } from '../../../models/review-booking';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-booking-modal.component.html',
  styleUrl: './view-booking-modal.component.css'
})
export class ViewBookingModalComponent {

  viewBookingModalElement: HTMLElement | null = null;
  @Input() booking: any = {}
  showDeclineReasonField: boolean = false
  review : ReviewBookingDTO = {
    bookingId: 0,
    reviewResponse: 0,
    declineReason: ""
  }
  declineInputFieldValidation:boolean = false
  modalMessage: string = ''

  constructor(private elementRef: ElementRef, private router: Router, private bookingService: BookingService) {}

  ngOnInit() {
    this.showDeclineReasonField = false
    this.declineInputFieldValidation = false
  }

  ngAfterViewInit(): void {
    this.viewBookingModalElement = this.elementRef.nativeElement.querySelector('#view-booking-modal')
  }

  closeSuccessModal(): void {
    const viewBookingModal = new Modal(this.viewBookingModalElement)
    viewBookingModal.hide()
  }

  acceptBooking() {
    this.review.reviewResponse = 1
    this.review.declineReason = null
    this.reviewApplication()
  }

  declineBooking() {
    this.showDeclineReasonField = true
    this.review.reviewResponse = 2
  }

  reviewApplication() {
    this.review.bookingId = this.booking.bookingId
    
    try {
      this.bookingService.reviewBooking(this.review).subscribe((response:any) => {
        console.log(response)

        if(response.isReviewed) {
          this.modalMessage = response.reviewMessage

          this.closeSuccessModal()
          this.router.navigate(['/bookings'])
          
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
