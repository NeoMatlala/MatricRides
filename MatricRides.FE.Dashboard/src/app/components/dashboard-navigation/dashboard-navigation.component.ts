import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-navigation',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-navigation.component.html',
  styleUrl: './dashboard-navigation.component.css'
})
export class DashboardNavigationComponent {

  constructor(private router: Router) {}

  removeRole(): void {
    localStorage.removeItem('role')
    this.router.navigate(['/login'])
  }
}
