import { Component, ElementRef } from '@angular/core';
import { HostApplication } from '../../../models/host-application';
import { FormsModule } from '@angular/forms';
import { HostApplicationService } from '../../../services/host-application/host-application.service';
import { Modal } from 'flowbite';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-host-application-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './host-application-form.component.html',
  styleUrl: './host-application-form.component.css'
})
export class HostApplicationFormComponent {
  host: HostApplication = {
    make: '',
    year: '',
    model: '',
    color: '',
    doors: '',
    fuelType: '',
    description: '',
    hourlyRate: '',
    name: '',
    surname: '',
    email: '',
    profilePicture: '',
    carImages: []
  }

  //formData: any = {};

  image1: File | null = null
  image2: File | null = null
  image3: File | null = null
  fileData: { [key: string]: File } = {};


  successModalElement: HTMLElement | null = null;

  successModalMessage: string = ''

  constructor(private http:HttpClient, private _submitHostService: HostApplicationService, private elementRef: ElementRef, private router: Router) {}

  ngAfterViewInit(): void {
    this.successModalElement = this.elementRef.nativeElement.querySelector('#success-modal')
  }

  onFileSelected(event: any, imageNumber: string) {
    const file: File = event.target.files[0];
    
    if (imageNumber === 'image1') {
      this.image1 = file;
      this.host.carImages.push(this.image1)
    } else if (imageNumber === 'image2') {
      this.image2 = file;
      this.host.carImages.push(this.image2)
    } else if (imageNumber === 'image3') {
      this.image3 = file;
      this.host.carImages.push(this.image3)
    } else if (imageNumber === 'profileImage') {
      this.host.profilePicture = file;
    }
  }

  submitHostApplication() {
    try {
      const formData = new FormData()
      
      formData.append('profilePicture', this.host.profilePicture)
      formData.append('name', this.host.name);
      formData.append('make', this.host.make);
      formData.append('email', this.host.email);
      formData.append('surname', this.host.surname);
      formData.append('year', this.host.year);
      formData.append('model', this.host.model);
      formData.append('color', this.host.color);
      formData.append('doors', this.host.doors);
      formData.append('fuelType', this.host.fuelType);
      formData.append('description', this.host.description);
      formData.append('hourlyRate', this.host.hourlyRate);
      for(let i = 0; i < this.host.carImages.length;i++) {
        formData.append('carImages', this.host.carImages[i])
      }

      const headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })

      

      this.http.post("https://localhost:7101/api/HostApproval/submit-host-application", formData).subscribe((response:any) => {
        console.log(response)

        if (response.isSuccess) {
            // open success modal, with message as message on modal
            this.successModalMessage = response.message
  
            const successModal = new Modal(this.successModalElement)
            successModal.show()
          }
      })

      
    } catch (error) {
      console.log("error submiting host application: ", error)
    }
  }

  closeSuccessModal(): void {
    const successModal = new Modal(this.successModalElement)
    successModal.hide()
    this.router.navigate(['/how-it-works'])
  }
}
