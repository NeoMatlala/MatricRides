import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CarService } from '../../../../services/cars/car.service';
import { CarouselModule } from '@coreui/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Modal } from 'flowbite';
import { BookingSuccessModalComponent } from '../../../modals/booking-success-modal/booking-success-modal/booking-success-modal.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BookingDto } from '../../../../models/bookingDto';
import { BookingService } from '../../../../services/booking/booking.service';

//declare var Datepicker: any;

@Component({
  selector: 'app-car-rental',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    RouterLink,
    BookingSuccessModalComponent,
    CalendarModule,],
  templateUrl: './car-rental.component.html',
  styleUrl: './car-rental.component.css'
})
export class CarRentalComponent {
  host: any = {}
  hostId: number = 0
  make: string = ''
  year: number = 0
  imageSrc: string[] = []
  profilePic: string = ''
  isUserLoggedIn: boolean = false
  showLoginMessage: boolean = false
  isPickup: boolean = false
  isDelivery: boolean = true
  totalCost: string | undefined
  hours: any = 0

  editModalElement: HTMLElement | null = null;
  successModalElement: HTMLElement | null = null;

  slides: any[] = new Array(3).fill({src: ''});
  addressString: string = ''

  @ViewChild('inputField')
  inputField!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;
  @Input() placeholder = ''

  booking: BookingDto = {}

  constructor(private _carService: CarService, private _bookingService: BookingService, private router: ActivatedRoute, private elementRef: ElementRef) {
    this.router.params.subscribe(params => {
      this.hostId = params['id']
      this.make = params['imake']
      this.year = params['year']
    })
  }

  ngAfterViewInit(): void {
    this.editModalElement = this.elementRef.nativeElement.querySelector('#car-edit-modal')
    this.successModalElement = this.elementRef.nativeElement.querySelector('#popup-modal')

    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement)

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      this.booking.deliveryAddress = place?.formatted_address
      // console.log(place)
    })

    this.totalCost = this.host.cars[0].hourlyRate 
  }

  ngOnInit() {
    this.fetchCar()

    this.slides[0] = {
      src: '../assets/car1.jpg',
    };
    this.slides[1] = {
      src: '../assets/hero-img.jpg',
    }
    this.slides[2] = {
      src: '../assets/kim.jpg',
    }

    this.showLoginMessage = false
  }

  onBookingUntilChange(date:Date) {
    if(!this.booking.from) {
      console.log("From is not set")
      return
    }

    // need to get the until value via days as well...

    // const from = this.booking.from?.getHours()
    // const dateTime = date.getHours()

    // const difference = dateTime - from
    // console.log(`${dateTime} - ${from} = ${difference}` )

    // const total = difference * this.host.cars[0].hourlyRate
    // this.hours = difference

    // console.log(`Total: ${total}` )

    // this.totalCost = total.toString()
    const date1: Date = new Date(this.booking.from)
    const date2: Date = new Date(this.booking.until!)

    const diffInMs: number = date2.getTime() - date1.getTime()

    const diffInHours: number = diffInMs / (1000 * 60 * 60);

    //console.log(`Difference in hours: ${diffInHours.toFixed(2)} hours`);

    this.hours = diffInHours.toFixed(2)

    const total = this.hours * this.host.cars[0].hourlyRate

    this.totalCost = total.toString()
  }

  fetchCar() {
    try {
      this._carService.getCar(this.hostId, this.make, this.year).subscribe((response:any) => {
        this.host = response
        this.processImages(this.host.cars[0].images)

        this.profilePic = 'data:image/jpeg;base64,' + this.host.profilePicture;

        this.sortAddress(this.host.cars[0].address)

        console.log(this.host)
        
      })
    } catch (error) {
      console.log("Error fetching car:", error)
    }
  }

  pickupSelected() {
    this.isDelivery = false
    this.isPickup = true
  }
  deliverySelected() {
    this.isDelivery = true
    this.isPickup = false
  }

  sortAddress(address:any) {
    this.addressString = `${address.streetNumber} ${address.streetName}, ${address.city}, ${address.province}`
  
    return this.addressString
   }

  processImages(images: any[]): void {
    
    images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image.carImage;
      this.imageSrc.push(src)
    })
  }

  // ------------------ modal code
  showModal() {

    const logInStatus = localStorage.getItem("isLoggedIn")

    if(logInStatus === "true") {
      this.isUserLoggedIn = true
      this.showLoginMessage = false
      const editModal = new Modal(this.editModalElement)
      editModal.show()
    } else {
      // show login message
      this.showLoginMessage = true
    }
   }

  bookCar() {
    this.booking.clientEmail = localStorage.getItem('userEmail')!
    this.booking.carId = this.host.cars[0].carId

    

    // PICKUP COSTS
    // until - from time. That value x hourlyRate
    // have a show cost - once calculation is done show price section (*NgIF=priceCalculated)

    this.booking.cost = this.totalCost

    //console.log(this.booking)

    try {
      this._bookingService.makeBooking(this.booking).subscribe((response: any) => {
        console.log(response)

        if(response.isBooked) {
          this.closeProfileModal()
          const successModal = new Modal(this.successModalElement)
          successModal.show()
        }
      })
    } catch (error) {
      console.log("FE: Error making booking - ", error)
    }
  }

  closeProfileModal() {
    const editModal = new Modal(this.editModalElement)
    editModal.hide()
   }
}
