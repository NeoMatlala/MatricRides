import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [EditProfileComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  host: any = {}
  imageSrc: string[] = []
  hostEmail: string= ''
  profilePic = ''
  hostCar: any = {}
  addressObject: any = {}
  addressString: string = ''

  editModalElement: HTMLElement | null = null;

  constructor(private route: ActivatedRoute, private elementRef: ElementRef, private _hostService: HostApplicationService) {
    this.route.params.subscribe(params => {
      this.hostEmail = params['email']
    })
  }

  ngAfterViewInit(): void {
    this.editModalElement = this.elementRef.nativeElement.querySelector('#edit-modal')
  }

  ngOnInit() {
    try {
      this._hostService.getHost(this.hostEmail).subscribe((response: any) => {
        this.host = response.hostObj
        this.hostCar = response.hostObj.cars[0]
        this.addressObject = this.hostCar.address
        this.sortAddress(this.addressObject)
        console.log(this.host)

        this.profilePic = 'data:image/jpeg;base64,' + this.host.profilePicture;
      })
    } catch (error) {
      console.log("Error getting service: ", error)
    }
 }

 sortAddress(address:any) {
  this.addressString = `${address.streetNumber} ${address.streetName}, ${address.city}, ${address.province}`

  return this.addressString
 }

 openProfileModal() {
  const editModal = new Modal(this.editModalElement)
  editModal.show()
 }
}
