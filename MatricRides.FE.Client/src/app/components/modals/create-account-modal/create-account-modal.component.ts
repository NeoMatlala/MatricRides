import { Component, ElementRef } from '@angular/core';
import { Modal } from 'flowbite';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { FormsModule } from '@angular/forms';
import { CreateUser } from '../../../models/create-user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-account-modal',
  standalone: true,
  imports: [
    LoginModalComponent,
    FormsModule
  ],
  templateUrl: './create-account-modal.component.html',
  styleUrl: './create-account-modal.component.css'
})
export class CreateAccountModalComponent {
  modalElement: HTMLElement | null = null;
  createAccountModal: HTMLElement | null = null;

  user: CreateUser = {
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  }

  constructor(private elementRef: ElementRef, private _userService: UserService) {}
  
  ngAfterViewInit(): void {
    this.modalElement = this.elementRef.nativeElement.querySelector('#default-modal')
    this.createAccountModal = this.elementRef.nativeElement.querySelector('#create-account-modal')
  }

  // closeModal(){
  //   const createAccountModalmodal = new Modal(this.createAccountModal)
  //   createAccountModalmodal.hide();
  //   this.openLoginModal()
  // }

  openLoginModal() {
     const logintModal = new Modal(this.modalElement)
     logintModal.show()
  }

  createClientUser() {
    this._userService.createAccount(this.user).subscribe((response: any) => {
      console.log(response)

      if(response.isSuccess) {
        const createAccountModalmodal = new Modal(this.createAccountModal)
        createAccountModalmodal.hide();
      }
    },
    error =>{
      console.log("Error creating client account -- ", error)
    })
    console.log(this.user)
  }

}
