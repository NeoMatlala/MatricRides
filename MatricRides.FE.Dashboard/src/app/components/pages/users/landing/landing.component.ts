import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  users: any = {}

  constructor(private userService: UserService) {}

  ngOnInit() {
    try {
      this.userService.GetUsers().subscribe((response:any) => {
        this.users = response
      })
    } catch (error) {
      console.log("Error getting users: ", error)
    }
  }
}
