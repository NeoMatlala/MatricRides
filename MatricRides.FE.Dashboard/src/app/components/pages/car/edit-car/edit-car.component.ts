import { Component, ElementRef, Input } from '@angular/core';
import { Modal } from 'flowbite';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../../services/cars/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent {
  editModalElement: HTMLElement | null = null;
  @Input() data: any = {};
  carId: number = 0

  car: any = {
    city: '',
    province: '',
    color: '',
    description: '',
    doors: '',
    fuelType: '',
    hourlyRate: '',
    make: '',
    model: '',
    year: '',
    images: [],
  }

  imageSrc: string[] = []

  latestImages: any = []

  constructor(private elementRef: ElementRef, private carService: CarService, private router: Router) {}

  editImages(event:any) {
    const files: FileList = event.target.files

    for( let i = 0; i< files.length; i++) {
      const file = files[i]

      if(file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = ((e:any) => {
          this.latestImages.push(file)
        })

        reader.readAsDataURL(file)
      }
      else {
          // If the file is not an image, you can handle this case accordingly
          console.log('File is not an image:', file.name);
      }
    }
  }

  ngOnInit() {
    if(this.data) {
      this.carId = this.data.carId

      this.car = {...this.data}
    }
    this.processImages(this.car.images)
  }

  ngAfterViewInit(): void {
    this.editModalElement = this.elementRef.nativeElement.querySelector('#car-edit-modal')
  }

  processImages(images: any[]): void {
    images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image.carImage;
      this.imageSrc.push(src)
    })
  }

  updateCarDetails() {
    console.log(this.latestImages)
    // try {
    //   this.carService.updateCar(this.carId, this.car).subscribe((response: any) => {
    //     console.log(response)

    //     if ( response.isUpdated ){
    //       this.closeProfileModal()
    //       this.router.navigate(["/host-cars"])
    //     }
    //   })
      
    // } catch (error) {
    //   console.log("Error updating car: ", error)
    // }
  }

  closeProfileModal() {
    const editModal = new Modal(this.editModalElement)
    editModal.hide()
   }
}
