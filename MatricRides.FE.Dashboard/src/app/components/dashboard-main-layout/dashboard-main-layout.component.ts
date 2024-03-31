import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardNavigationComponent } from '../dashboard-navigation/dashboard-navigation.component';

@Component({
  selector: 'app-dashboard-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardNavigationComponent
  ],
  templateUrl: './dashboard-main-layout.component.html',
  styleUrl: './dashboard-main-layout.component.css'
})
export class DashboardMainLayoutComponent {

}
