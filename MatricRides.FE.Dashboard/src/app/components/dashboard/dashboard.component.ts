import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HostApplicationService } from '../../services/host-applications/host-application.service';
import { Router, RouterLink } from '@angular/router';
import { ViewCarComponent } from '../pages/car/view-car/view-car.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ViewCarComponent],
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
