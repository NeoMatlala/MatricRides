import { Component } from '@angular/core';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-host-application-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './host-application-card.component.html',
  styleUrl: './host-application-card.component.css'
})
export class HostApplicationCardComponent {

  activeHostAppCount: number = 0

  constructor(private _hostApplicationService: HostApplicationService, private router: Router) {}

  ngOnInit(){
    try {
      this._hostApplicationService.gethostsAwaitingApproval().subscribe((response: any) => {
        
        this.activeHostAppCount = response.length
      })
    } catch (error) {
      console.log("error getting hosts awaiting approval: ", error)
    }
  }
}
