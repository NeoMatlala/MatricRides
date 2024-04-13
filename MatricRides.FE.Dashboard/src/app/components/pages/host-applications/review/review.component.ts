import { Component } from '@angular/core';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  hostId: number = 0

  host: any= {}
  hostCar: any = []

  constructor(private _hostApplicationService: HostApplicationService, private route: Router, private router: ActivatedRoute) {
    this.router.params.subscribe(params => {
      this.hostId = params['id']
    })
  }
  
  ngOnInit() {
    try {
      this._hostApplicationService.gethostAwaitingApproval(this.hostId).subscribe((response:any) => {
        this.host = response.hostObj
        this.hostCar = response.hostObj.cars[0]
      })
    } catch (error) {
      console.log("error getting host awaiting approval: ", error)
    }
  }

  ApproveHost(id:number) {
    try {
      this._hostApplicationService.approveHost(id).subscribe((response:any) => {

        if (response.isSuccess) {
          this.route.navigate(["/host-applications"])
        }
      })
    } catch (error) {
      console.log("error getting host awaiting approval: ", error)
    }
  }
}
