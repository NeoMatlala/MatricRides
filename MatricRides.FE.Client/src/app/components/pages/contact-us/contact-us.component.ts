import { Component, ElementRef } from '@angular/core';
import { ContactUs } from '../../../models/contact-us';
import { ContactUsService } from '../../../services/contact-us/contact-us.service';
import { FormsModule } from '@angular/forms';
import { Modal } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contactForm: ContactUs = {
    name: '',
    email: '',
    subject: '',
    phoneNumber: '',
    messageBody: '',
  }

  successModalElement: HTMLElement | null = null;
  successModalMessage: string = ''

  constructor(private contactUs: ContactUsService, private elementRef: ElementRef, private router: Router) {}

  ngAfterViewInit(): void {
    this.successModalElement = this.elementRef.nativeElement.querySelector('#success-modal')
  }

  onSubmit() {
    try {
      this.contactUs.contactUs(this.contactForm).subscribe((response: any) => {
        console.log(response)

        if (response.isMessageSent) {
          this.successModalMessage = response.message

          const successModal = new Modal(this.successModalElement)
          successModal.show()
        }
      })
    } catch (error) {
      console.log("Error sending form: ", error)
    }
  }

  closeSuccessModal(): void {
    const successModal = new Modal(this.successModalElement)
    successModal.hide()
    this.router.navigate(['/'])
  }
}
