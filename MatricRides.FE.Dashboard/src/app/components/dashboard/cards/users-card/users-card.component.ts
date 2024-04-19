import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.css'
})
export class UsersCardComponent {

  userCount: number = 0

  constructor(private userService: UserService) {}

  ngOnInit() {
    try {
      this.userService.GetUserCount().subscribe((response:any) => {
        this.userCount = response
      })
    } catch (error) {
      console.log("Error getting users")
    }
  }
}
