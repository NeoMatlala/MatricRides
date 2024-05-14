import { Component, ElementRef, Input } from '@angular/core';
import { Modal } from 'flowbite';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../../services/cars/car.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  imagesWithIDAndSrc: {picId: number, src: string}[] = []

  latestImages: any = []

  image1: File | null = null
  image2: File | null = null
  image3: File | null = null

  uploadedImage1: string = ''
  uploadedImage2: string = ''
  uploadedImage3: string = ''

  latestUpload: string = ''
  latestUploadIndex: number = 0
  imagesFromApi:any = []
  clickedImages:any = []

  constructor(private elementRef: ElementRef, private carService: CarService, private router: Router, private http: HttpClient) {}

  // TODO: use this to send only changed fields
  onInputChange(value: any, field: string) {
    console.log(`This field ${field} changed: ${value}`)
  }

  onFileSelected(event: any, imageNumber: string) {
    const file: File = event.target.files[0];
    
    if (imageNumber === 'uploadedImage1') {
      this.image1 = file;
      this.latestImages.push(this.image1)

      // display uploaded profile
      const reader = new FileReader()
      reader.onload = (e:any) => {
        this.uploadedImage1 = e.target.result
      }
      reader.readAsDataURL(file);
    } else if (imageNumber === 'uploadedImage2') {
      this.image2 = file;
      this.latestImages.push(this.image2)

      // display uploaded profile
      const reader = new FileReader()
      reader.onload = (e:any) => {
        this.uploadedImage2 = e.target.result
      }
      reader.readAsDataURL(file);
    } else if (imageNumber === 'uploadedImage3') {
      this.image3 = file;
      this.latestImages.push(this.image3)

      // display uploaded profile
      const reader = new FileReader()
      reader.onload = (e:any) => {
        this.uploadedImage3 = e.target.result
      }
      reader.readAsDataURL(file);
    }
  }

  showID(selectedID:number, byteData: string, index:number) {
    // use this for each upedited image
    // console.log(selectedID)
    // console.log(index)

    const image = this.imagesFromApi[index]
    this.clickedImages.push(image) 
  }

  editImages(event:any, index: number) {
    const files: FileList = event.target.files
    

    for( let i = 0; i< files.length; i++) {
      const file = files[i]

      if(file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = ((e:any) => {
          this.latestUpload = e.target.result
          this.latestUploadIndex = index;
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
    this.imagesFromApi = this.car.images
    this.processImages(this.car.images)
  }

  ngAfterViewInit(): void {
    this.editModalElement = this.elementRef.nativeElement.querySelector('#car-edit-modal')
  }

  processImages(images: any[]): void {
    images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image.carImage;

      this.imagesWithIDAndSrc.push({picId: image.imageId, src: src})
    })
  }

  updateCarDetails() {
    const notClicked = this.imagesFromApi.filter((indexB:any) => !this.clickedImages.includes(indexB))

    notClicked.forEach((obj: any) => {
        //console.log(obj.imageId)
        const byteString = atob(obj.carImage)
        const byteArray = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }
  
        const blob = new Blob([byteArray], {type: 'image/jpeg'})
        const file = new File([blob], `${obj.imageId}.jpg`, {type: 'image/jpg'})
        this.latestImages.push(file)
      })

    console.log(this.latestImages)

    //console.log(this.clickedImages)
    try {
      const formData = new FormData()

      formData.append('Make', this.car.make)
      formData.append('Model', this.car.model)
      formData.append('Year', this.car.year)
      formData.append('Doors', this.car.doors)
      formData.append('Color', this.car.color)
      formData.append('FuelType', this.car.fuelType)
      formData.append('Description', this.car.description)
      formData.append('HourlyRate', this.car.hourlyRate)
      formData.append('City', this.car.city)
      formData.append('Province', this.car.province)
      for( let i = 0; i < this.latestImages.length; i++) {
        formData.append('carImages', this.latestImages[i])
      }

      this.http.put(`https://localhost:7101/api/Car/update-car/${this.carId}`, formData).subscribe((response: any) => {
        console.log(response)

        if(response.isUpdated) {
          this.closeProfileModal()
          this.router.navigate(['/host-cars'])
        }
      })
      
    } catch (error) {
      console.log("Error updating car: ", error)
    }
  }

  closeProfileModal() {
    const editModal = new Modal(this.editModalElement)
    editModal.hide()
   }
}
