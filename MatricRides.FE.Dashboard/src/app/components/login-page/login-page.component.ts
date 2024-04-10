import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { loginUser } from '../../models/login-user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private router: Router, private _userService: UserService) {}

  user: loginUser = {
    email: '',
    password: ''
  }

  submitLogin(){
    this._userService.login(this.user).subscribe((response: any) => {
      console.log(response)

      if(response.isSuccess) {
        localStorage.setItem('role', response.roles[0])

        this.router.navigate(['/dashboard'])
      }
    },
    error => {
     console.log("error logging in:", error) 
    })
  }
}
