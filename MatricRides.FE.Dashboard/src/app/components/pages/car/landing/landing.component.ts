import { Component } from '@angular/core';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  hostEmail: any = ''
  host: any = {}
  hostCar: any = {}
  profilePic: string = ''

  constructor(private _hostService: HostApplicationService, private router: Router) {}

  ngOnInit(): void {
    this.hostEmail = localStorage.getItem('email')
    try {
      this._hostService.getHost(this.hostEmail).subscribe((response: any) => {
        
        this.host = response.hostObj
        this.hostCar = response.hostObj.cars[0]

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
