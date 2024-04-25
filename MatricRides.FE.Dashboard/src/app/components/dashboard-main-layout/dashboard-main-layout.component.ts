import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardNavigationComponent } from '../dashboard-navigation/dashboard-navigation.component';
import { TopNavComponent } from '../pages/host-profile/top-nav/top-nav.component';

@Component({
  selector: 'app-dashboard-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardNavigationComponent,
    TopNavComponent
  ],
  templateUrl: './dashboard-main-layout.component.html',
  styleUrl: './dashboard-main-layout.component.css'
})
export class DashboardMainLayoutComponent {

}
