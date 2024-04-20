import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HostApplicationService } from '../../../services/host-applications/host-application.service';
import { CommonModule } from '@angular/common';
import { CreateHostUser } from '../../../models/create-host';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-create-host-account',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './create-host-account.component.html',
  styleUrl: './create-host-account.component.css'
})
export class CreateHostAccountComponent {
  showApproved: boolean = false
  showError: boolean = false
  alertMessage: string = ''
  @ViewChild('emailInput') emailInput: any;
  successModalElement: HTMLElement | null = null;

  successModalMessage: string = "Your host account has successfully been created";
  passwordMismatch: boolean = false

  hostUser: CreateHostUser = {
    email: '',
    password: '',
    confirmPassword: '',
    role: 'host'
  }

  constructor(private _hostService: HostApplicationService, private elementRef: ElementRef, private router: Router, private _userService:UserService) {
    this.passwordMismatch = false
  }

  ngAfterViewInit(): void {
    this.successModalElement = this.elementRef.nativeElement.querySelector('#success-modal')
  }

  checkApproval(email:string): void {
    try {
      this._hostService.checkApproval(email).subscribe((response: any) => {

        if(response.isVerified){
          this.showApproved = true
          this.showError = false
          this.hostUser.email = email
        } else {
          this.showError = true
          this.showApproved = false
        }

        this.alertMessage = response.message
      })
    } catch (error) {
      console.log("Error checking approval: ", error)
    }
  }

  createHost() {
    if(this.hostUser.password !== this.hostUser.confirmPassword) {
      this.passwordMismatch = true
      console.log("password mismatch")
    } else {
      
      try {
        this._userService.createHost(this.hostUser).subscribe((response: any) => {
          console.log(response)
          
          if(response.isSuccess) {
            const successModal = new Modal(this.successModalElement)
            successModal.show()
          }
          
        })
      } catch (error) {
        console.log("Error creating host: ", error)
      }
    }
    
  }

  closeSuccessModal(): void {
    const successModal = new Modal(this.successModalElement)
    successModal.hide()
    this.router.navigate(['/login'])
  }
}
