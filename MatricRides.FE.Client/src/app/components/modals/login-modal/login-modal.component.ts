import { Component, ElementRef } from '@angular/core';
import { Modal } from 'flowbite';
import { CreateAccountModalComponent } from '../create-account-modal/create-account-modal.component';
import { LoginUser } from '../../../models/login';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CreateAccountModalComponent, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  modalElement: HTMLElement | null = null;
  createAccountModal: HTMLElement | null = null;

  user: LoginUser = {
    email: '',
    password: '',
  }
  

  constructor(private elementRef: ElementRef, private _userService: UserService) {}

  ngAfterViewInit(): void {
    this.modalElement = this.elementRef.nativeElement.querySelector('#default-modal')
    this.createAccountModal = this.elementRef.nativeElement.querySelector('#create-account-modal')
  }

  loginUser() {
    try {
      this._userService.login(this.user).subscribe((response: any) => {
        console.log(response)
  
        if(response.isSuccess) {
          // add to local storage
          // localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userEmail', this.user.email)

          const modal = new Modal(this.modalElement)
          modal.hide();
        }
      })
    } catch (error) {
      console.log("Error loging in --", error)
    }
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
