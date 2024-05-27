import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HostApplication } from '../../../models/host-application';
import { FormsModule } from '@angular/forms';
import { HostApplicationService } from '../../../services/host-application/host-application.service';
import { Modal } from 'flowbite';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SearchCarAddressComponent } from '../../search-car-address/search-car-address.component';

@Component({
  selector: 'app-host-application-form',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchCarAddressComponent],
  templateUrl: './host-application-form.component.html',
  styleUrl: './host-application-form.component.css'
})
export class HostApplicationFormComponent {
  @ViewChild('inputField')
  inputField!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;
  @Input() placeholder = ''
  
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
    carImages: [],
    formattedAddress: ''
  }

  //formData: any = {};

  image1: File | null = null
  image1Url: string = ''
  image2Url: string = ''
  image3Url: string = ''
  profileImageUrl: string = ''
  image2: File | null = null
  image3: File | null = null
  fileData: { [key: string]: File } = {};


  successModalElement: HTMLElement | null = null;

  successModalMessage: string = ''

  constructor(private http:HttpClient, private _submitHostService: HostApplicationService, private elementRef: ElementRef, private router: Router) {}

  ngAfterViewInit(): void {
    this.successModalElement = this.elementRef.nativeElement.querySelector('#success-modal')

    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement)

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      this.host.formattedAddress = place?.formatted_address
      // console.log(place)
    })
  }

  onFileSelected(event: any, imageNumber: string) {
    const file: File = event.target.files[0];
    
    if (imageNumber === 'image1') {
      this.image1 = file;
      this.host.carImages.push(this.image1)

      // display uploaded image1
      const reader = new FileReader()
      reader.onload = (e:any) => {
        this.image1Url = e.target.result
      }
      reader.readAsDataURL(file);
    } else if (imageNumber === 'image2') {
      this.image2 = file;
      this.host.carImages.push(this.image2)

      // display uploaded image2
      const reader = new FileReader()
      reader.onload = (e:any) => {
        this.image2Url = e.target.result
      }
      reader.readAsDataURL(file);
    } else if (imageNumber === 'image3') {
      this.image3 = file;
      this.host.carImages.push(this.image3)

      // display uploaded image2
      const reader = new FileReader()
      reader.onload = (e:any) => {
        this.image3Url = e.target.result
      }
      reader.readAsDataURL(file);
    } else if (imageNumber === 'profileImage') {
      this.host.profilePicture = file;

      // display profile image
      const reader = new FileReader()
      reader.onload = (e:any) => {
        this.profileImageUrl = e.target.result
      }
      reader.readAsDataURL(file);
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
      formData.append('formattedAddress', this.host.formattedAddress!);
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
    //console.log(this.host.formattedAddress)
  }

  closeSuccessModal(): void {
    const successModal = new Modal(this.successModalElement)
    successModal.hide()
    this.router.navigate(['/how-it-works'])
  }
}
