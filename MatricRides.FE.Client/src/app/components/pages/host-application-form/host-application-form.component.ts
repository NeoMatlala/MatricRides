import { Component, ElementRef } from '@angular/core';
import { HostApplication } from '../../../models/host-application';
import { FormsModule } from '@angular/forms';
import { HostApplicationService } from '../../../services/host-application/host-application.service';
import { Modal } from 'flowbite';
import { Router } from '@angular/router';

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
    email: ''
  }

  successModalElement: HTMLElement | null = null;

  successModalMessage: string = ''

  constructor(private _submitHostService: HostApplicationService, private elementRef: ElementRef, private router: Router) {}

  ngAfterViewInit(): void {
    this.successModalElement = this.elementRef.nativeElement.querySelector('#success-modal')
  }

  submitHostApplication() {
    try {
      this._submitHostService.submitHostApplication(this.host).subscribe((response:any) => {
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
