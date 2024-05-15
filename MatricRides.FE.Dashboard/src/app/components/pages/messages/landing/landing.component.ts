import { Component, ElementRef } from '@angular/core';
import { ContactUsService } from '../../../../services/contact-us/contact-us.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  messages: any = []
  message: any = {}

  messageModalElement: HTMLElement | null = null;

  constructor(private contactService: ContactUsService, private router: Router, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.messageModalElement = this.elementRef.nativeElement.querySelector('#message-modal')
  }

  ngOnInit() {
    try {
      this.contactService.getAllMessages().subscribe((response: any) => {
        this.messages = response
      })
    } catch (error) {
      console.log("Error getting messages", error)
    }
  }

  showMessage(messageId:number) {
    try {
      this.contactService.getMessage(messageId).subscribe((response: any) => {
        this.message = response

        if(this.message) {
          const messageModal = new Modal(this.messageModalElement)
          messageModal.show()
        }
      })
    } catch (error) {
      console.log("Error getting messages", error)
    }
    // get message via ID - if e gona, open modal with data 
  }

  closeModal(): void {
    const successModal = new Modal(this.messageModalElement)
    successModal.hide()
    this.router.navigate(['/messages'])
  }
}
