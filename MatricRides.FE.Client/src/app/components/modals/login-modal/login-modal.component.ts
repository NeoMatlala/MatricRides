import { Component, ElementRef } from '@angular/core';
import { Modal } from 'flowbite';
import { CreateAccountModalComponent } from '../create-account-modal/create-account-modal.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CreateAccountModalComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  modalElement: HTMLElement | null = null;
  createAccountModal: HTMLElement | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.modalElement = this.elementRef.nativeElement.querySelector('#default-modal')
    this.createAccountModal = this.elementRef.nativeElement.querySelector('#create-account-modal')
  }
  
  closeModal(){
    const modal = new Modal(this.modalElement)
    modal.hide();
    this.openCreateAccountModal()
  }

  openCreateAccountModal() {
     const createAccountModal = new Modal(this.createAccountModal)
     createAccountModal.show()
  }
}
