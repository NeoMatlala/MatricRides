import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { loginUser } from '../../models/login-user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  incorrectPassword: boolean = false
  incorrectUser: boolean = false

  constructor(private router: Router, private _userService: UserService) {
    this.incorrectPassword = false
    this.incorrectUser = false
  }

  

  user: loginUser = {
    email: '',
    password: ''
  }

  submitLogin(){
    this._userService.login(this.user).subscribe((response: any) => {
      console.log(response)

      if(response.isSuccess) {
        localStorage.setItem('role', response.roles[0])
        localStorage.setItem('email', this.user.email)

        this.router.navigate(['/dashboard'])
      }
    },
    error => {
     console.log("error logging in:", error) 

     if(error.error.message == "User does not exist") {
      this.incorrectUser = true
     }

     if(error.error.message == "Incorrect Password") {
      this.incorrectPassword = true
     }

     
    })
  }
}
