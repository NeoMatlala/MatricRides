import { Component, ElementRef, Input } from '@angular/core';
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
    photo: ''
  }
  hostId: number = 0
  @Input() data: any = {};
  uploadedImageUrl: string = ''

  constructor(private elementRef: ElementRef, private hostService: HostApplicationService) {}

  ngOnInit() {
    if(this.data) {
      this.hostId = this.data.hostId
    }
  }

  ngAfterViewInit(): void {
    this.editModalElement = this.elementRef.nativeElement.querySelector('#edit-modal')
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
    this.hostId = this.data.hostId
    const formData = new FormData

    formData.append('name', this.host.name)
    formData.append('surname', this.host.surname)
    formData.append('email', this.host.email)
    formData.append('image', this.host.photo)

    try {
      this.hostService.updateHost(this.hostId, formData).subscribe((response: any) => {
       
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
