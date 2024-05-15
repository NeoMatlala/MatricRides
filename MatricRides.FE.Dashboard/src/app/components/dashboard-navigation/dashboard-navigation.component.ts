import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ContactUsService } from '../../services/contact-us/contact-us.service';

@Component({
  selector: 'app-dashboard-navigation',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './dashboard-navigation.component.html',
  styleUrl: './dashboard-navigation.component.css'
})
export class DashboardNavigationComponent {

  constructor(private router: Router, private contactService: ContactUsService) {}

  role: any = " "
  unreadCount: number = 0
  

  ngOnInit(): void {
    this.role = localStorage.getItem('role')

    try {
      this.contactService.getUnreadMessages().subscribe((response:any) => {
        this.unreadCount = response
      })
    } catch (error) {
      console.log("Error getting unread message count",error)
    }
  }

  removeRole(): void {
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    this.router.navigate(['/login'])
  }
}
