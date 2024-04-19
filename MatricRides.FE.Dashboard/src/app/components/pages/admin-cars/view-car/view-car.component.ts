import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../../../services/cars/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-car',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-car.component.html',
  styleUrl: './view-car.component.css'
})
export class ViewCarComponent {

  hostId: number = 0
  host: any = {}
  hostCar: any = {}
  profilePic: string = ''
  imageSrc: string[] = []

  constructor(private router: ActivatedRoute, private carService: CarService) {
    this.router.params.subscribe(params => {
      this.hostId = params['id']
    })
  }

  ngOnInit() {
    try {
      this.carService.getCarInfo(this.hostId).subscribe((response: any) => {
        console.log(response.hostObj)
        this.host = response.hostObj
        this.hostCar = this.host.cars[0]

        this.processImages(response.hostObj.cars[0].images)

        this.profilePic = 'data:image/jpeg;base64,' + this.host.profilePicture;
      })
    } catch (error) {
      console.log("Error getting car: ", error)
    }
  }

  processImages(images: any[]): void {
    images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image.carImage;
      this.imageSrc.push(src)
    })
    
  }
}
