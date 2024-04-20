import { Component } from '@angular/core';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-host-cars-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './host-cars-card.component.html',
  styleUrl: './host-cars-card.component.css'
})
export class HostCarsCardComponent {

  carCount: number = 0
  hostEmail: any = ''

  constructor(private hostService: HostApplicationService) {}

  ngOnInit() {
    this.hostEmail = localStorage.getItem('email')

    try {
      this.hostService.getHost(this.hostEmail).subscribe((response:any) => {
        this.carCount = response.hostObj.cars.length
      })
    } catch (error) {
      console.log("Error getting car count")
    }
  }
}
