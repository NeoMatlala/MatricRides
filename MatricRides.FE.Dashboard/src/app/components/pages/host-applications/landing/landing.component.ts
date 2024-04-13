import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgFor
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  constructor(private _hostApplicationService: HostApplicationService, private router: Router) {}

  hosts: any = []
  
  ngOnInit(){
    try {
      this._hostApplicationService.gethostsAwaitingApproval().subscribe((response: any) => {
        
        this.hosts = response
      })
    } catch (error) {
      console.log("error getting hosts awaiting approval: ", error)
    }
  }

  reviewHost(id: number) {
    this.router.navigate(["/review-application", id])
  }
}
