import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HostApplicationService } from '../../services/host-applications/host-application.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  role: any = " "
  hostEmail: any = ''
  host: any = {}
  hostCar: any = {}

  constructor(private _hostService: HostApplicationService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role')
    this.hostEmail = localStorage.getItem('email')
    
    try {
      this._hostService.getHost(this.hostEmail).subscribe((response: any) => {
        
        this.host = response.hostObj
        this.hostCar = response.hostObj.cars[0]
        console.log( this.host)

        //console.log(this.host.cars.length)
      })
    } catch (error) {
      console.log("Error getting service: ", error)
    }
  }
}
