import { Component, ElementRef } from '@angular/core';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-booking-success-modal',
  standalone: true,
  imports: [],
  templateUrl: './booking-success-modal.component.html',
  styleUrl: './booking-success-modal.component.css'
})
export class BookingSuccessModalComponent {
  successModalElement: HTMLElement | null = null;

  constructor(private elementRef: ElementRef){}

  ngAfterViewInit(): void {
    this.successModalElement = this.elementRef.nativeElement.querySelector('#popup-modal')
  }

  closeSuccessModal() {
    const successModal = new Modal(this.successModalElement)
    successModal.hide()
   }
}
