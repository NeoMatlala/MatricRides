import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'flowbite';
import { EditCarComponent } from '../edit-car/edit-car.component';

@Component({
  selector: 'app-view-car',
  standalone: true,
  imports: [CommonModule, EditCarComponent],
  templateUrl: './view-car.component.html',
  styleUrl: './view-car.component.css'
})
export class ViewCarComponent {

  carObj: any = {}
  imageSrc: string[] = []

  editModalElement: HTMLElement | null = null;

  constructor(private route: ActivatedRoute, private elementRef: ElementRef) {
    this.route.queryParams.subscribe(params => {
      this.carObj = JSON.parse(params['data'])
      
    })
  }

  ngAfterViewInit(): void {
    this.editModalElement = this.elementRef.nativeElement.querySelector('#car-edit-modal')
  }
  
  ngOnInit() {
    this.processImages(this.carObj.images)
    console.log(this.carObj)
  }

  processImages(images: any[]): void {
    images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image.carImage;
      this.imageSrc.push(src)
    })
    
  }

  openProfileModal() {
    const editModal = new Modal(this.editModalElement)
    editModal.show()
   }
}
