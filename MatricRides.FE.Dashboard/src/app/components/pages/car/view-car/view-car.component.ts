import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-car',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-car.component.html',
  styleUrl: './view-car.component.css'
})
export class ViewCarComponent {

  carObj: any = {}
  imageSrc: string[] = []

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.carObj = JSON.parse(params['data'])
      
    })
  }
  
  ngOnInit() {
    this.processImages(this.carObj.images)
  }

  processImages(images: any[]): void {
    images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image.carImage;
      this.imageSrc.push(src)
    })
    
  }
}
