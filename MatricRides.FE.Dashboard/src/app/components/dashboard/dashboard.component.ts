import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HostApplicationService } from '../../services/host-applications/host-application.service';
import { Router, RouterLink } from '@angular/router';
import { ViewCarComponent } from '../pages/car/view-car/view-car.component';
import { HostApplicationCardComponent } from './cards/host-application-card/host-application-card.component';
import { AdminCarsCardComponent } from './cards/admin-cars-card/admin-cars-card.component';
import { LandingComponent } from '../pages/admin-cars/landing/landing.component';
import { LandingComponent as carTable} from '../pages/users/landing/landing.component';
import { UsersCardComponent } from './cards/users-card/users-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ViewCarComponent,
    HostApplicationCardComponent,
    AdminCarsCardComponent,
    LandingComponent,
    UsersCardComponent,
    carTable
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  role: any = " "
  hostEmail: any = ''
  host: any = {}
  hostCar: any = {}
  profilePic: string = ''

  constructor(private _hostService: HostApplicationService, private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role')
    this.hostEmail = localStorage.getItem('email')
    
    try {
      this._hostService.getHost(this.hostEmail).subscribe((response: any) => {
        
        this.host = response.hostObj
        this.hostCar = response.hostObj.cars[0]
        console.log( this.host)

        this.profilePic = 'data:image/jpeg;base64,' + this.host.profilePicture;
      })
    } catch (error) {
      console.log("Error getting service: ", error)
    }
  }

  viewCar(make:string) {
    this.router.navigate(["/view-car", make], {queryParams: {data: JSON.stringify(this.hostCar)}})
  }
}
