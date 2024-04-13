import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HostApplicationService } from '../../../services/host-applications/host-application.service';
import { CommonModule } from '@angular/common';
import { CreateHostUser } from '../../../models/create-host';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

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

  hostUser: CreateHostUser = {
    email: '',
    password: '',
    confirmPassword: '',
    role: 'host'
  }

  constructor(private _hostService: HostApplicationService, private router: Router, private _userService:UserService) {}

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
      console.log("password mismatch")
    } else {
      
      try {
        this._userService.createHost(this.hostUser).subscribe((response: any) => {
          console.log(response)
          
          if(response.isSuccess) [
            this.router.navigate(["/login"])
          ]
        })
      } catch (error) {
        console.log("Error creating host: ", error)
      }
    }
    
  }
}
