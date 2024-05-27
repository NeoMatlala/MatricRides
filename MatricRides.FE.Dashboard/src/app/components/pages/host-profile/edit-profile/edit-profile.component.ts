import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from 'flowbite';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { CommonModule } from '@angular/common';
import { UpdateHostDto } from '../../../../models/update-host';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  editModalElement: HTMLElement | null = null;
  host: UpdateHostDto = {
    name: '',
    surname: '',
    email: '',
    photo: '',
    formattedAddress: ''
  }
  hostId: number = 0
  addressId: number = 0
  @Input() data: any = {};
  uploadedImageUrl: string = ''
  addressString: string = ''

  @ViewChild('inputField')
  inputField!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;
  @Input() placeholder = ''

  constructor(private elementRef: ElementRef, private hostService: HostApplicationService) {}

  ngOnInit() {
    // if(this.data) {
    //   //this.hostId = this.data.hostId
    //   console.log("true")
    //   console.log(this.data.addressId)
    // }
    
  }

  ngAfterViewInit(): void {
    this.editModalElement = this.elementRef.nativeElement.querySelector('#edit-modal')

    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement)

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      this.host.formattedAddress = place?.formatted_address
      // console.log(place)
    })
  }

  sortAddress(address:any) {
    this.addressString = `${address.streetNumber} ${address.streetName}, ${address.city}, ${address.province}`
  
    return this.addressString
   }

  onFileSelected(event: any, imageNumber: string) {
    const file: File = event.target.files[0];
    
    if (imageNumber === 'profileImage') {
      this.host.photo = file;

      // display uploaded profile
      const reader = new FileReader()
      reader.onload = (e:any) => {
        this.uploadedImageUrl = e.target.result
      }
      reader.readAsDataURL(file);
    }
  }

  updateHostDetails() {
    this.hostId = this.data.host.hostId
    const addressId = this.data.addressId
    //console.log(this.host.formattedAddress)
    const formData = new FormData

    formData.append('name', this.host.name)
    formData.append('surname', this.host.surname)
    formData.append('email', this.host.email)
    formData.append('image', this.host.photo)
    formData.append('updatedFormattedAddress', this.host.formattedAddress!)

    try {
      this.hostService.updateHost(this.hostId, addressId, formData).subscribe((response: any) => {
       
        if (response.isSuccess) {
          window.location.reload()
        }
      })
    } catch (error) {
     console.log("Error updating host: ", error) 
    }
  }

  closeProfileModal() {
    const editModal = new Modal(this.editModalElement)
    editModal.hide()
   }
}
