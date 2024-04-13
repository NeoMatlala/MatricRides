import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';

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

  constructor(private router: Router) {}

  role: any = " "

  ngOnInit(): void {
    this.role = localStorage.getItem('role')
  }

  removeRole(): void {
    localStorage.removeItem('role')
    this.router.navigate(['/login'])
  }
}
