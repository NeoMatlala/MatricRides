import { Component } from '@angular/core';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  hostId: number = 0
  imageSrc: string[] = []
  
  host: any= {}
  hostCar: any = []

  constructor(private _hostApplicationService: HostApplicationService, private route: Router, private router: ActivatedRoute) {
    this.router.params.subscribe(params => {
      this.hostId = params['id']
    })
  }
  
  ngOnInit() {
    this.fetchHosts()
  }

  fetchHosts(): void {
    try {
      this._hostApplicationService.gethostAwaitingApproval(this.hostId).subscribe((response:any) => {
        this.host = response.hostObj 
        this.hostCar = response.hostObj.cars[0]
        this.processImages(response.hostObj.cars[0].images)
      })
    } catch (error) {
      console.log("error getting host awaiting approval: ", error)
    }
  }

  processImages(images: any[]): void {
    images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image.carImage;
      this.imageSrc.push(src)
    })
    
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
