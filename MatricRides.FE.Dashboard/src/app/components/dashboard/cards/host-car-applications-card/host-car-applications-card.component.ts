import { Component } from '@angular/core';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-host-car-applications-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './host-car-applications-card.component.html',
  styleUrl: './host-car-applications-card.component.css'
})
export class HostCarApplicationsCardComponent {

  applicationsCount: number = 0
  hostEmail: any = ''

  constructor(private hostService: HostApplicationService) {}

  ngOnInit() {
    this.hostEmail = localStorage.getItem('email')

    try {
      this.hostService.getHost(this.hostEmail).subscribe((response:any) => {
        console.log(response)
        this.applicationsCount = response.bookings.length
      })
    } catch (error) {
      console.log("Error getting car count")
    }
  }
}
