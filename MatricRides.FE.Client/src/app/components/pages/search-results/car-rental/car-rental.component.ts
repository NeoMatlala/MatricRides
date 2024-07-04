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
import { HttpClient } from '@angular/common/http';

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
  minimumDate = new Date();

  editModalElement: HTMLElement | null = null;
  successModalElement: HTMLElement | null = null;

  slides: any[] = new Array(3).fill({src: ''});
  addressString: string = ''

  @ViewChild('inputField')
  inputField!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;
  @Input() placeholder = ''

  booking: BookingDto = {}
  showCost: boolean = false

  // for delivery 
  carAddress: string | undefined
  clientAddress: string | undefined
  distance: string | undefined
  deliveryTotal: number = 0
  costPerKilometer = 3
  invoiceTotal: string | undefined

  // validation
  showFromError: boolean = false
  showUntilError: boolean = false
  showIDNumberError: boolean = false
  showSchoolError: boolean = false
  showDeliveryAddressError: boolean = false

  constructor(private _carService: CarService, private _bookingService: BookingService, private router: ActivatedRoute, private elementRef: ElementRef, private http: HttpClient) {
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

  async calculateCosts() {
    this.showCost = false;

    // validation
    if(!this.booking.from) {
      this.showFromError = true
    } else {
      this.showFromError = false
    }

    if(!this.booking.until) {
      this.showUntilError = true
    } else {
      this.showUntilError = false
    }

    if(!this.booking.clientIDNumber) {
      this.showIDNumberError = true
    } else {
      this.showIDNumberError = false
    }

    if(!this.booking.school) {
      this.showSchoolError = true
    } else {
      this.showSchoolError = false
    }

    if(this.isDelivery) {
      if(!this.booking.deliveryAddress) {
        this.showDeliveryAddressError = true
      } else {
        this.showDeliveryAddressError = false
      }
    }

    if (!this.showFromError &&
        !this.showUntilError &&
        !this.showIDNumberError &&
        !this.showSchoolError &&
        (!this.isDelivery || !this.showDeliveryAddressError)) {
      this.showCost = true;
    }

    if(this.booking.deliveryAddress) {
      this.clientAddress = this.booking.deliveryAddress
      this.distance = await this.calculateDeliveryDistance(this.carAddress!, this.clientAddress)

      //console.log(`Distance yela ke = ${this.distance} makgowa`)

      if(this.distance !== undefined) {
        const totalCost = this.costPerKilometer * parseFloat(this.distance.replace(/[^\d.]/g, ''))

        this.deliveryTotal = parseFloat(totalCost.toFixed(2))
      }
    }

    this.invoiceTotal = this.bookingTotal(this.totalCost, this.deliveryTotal)
  }
  
  bookingTotal(bookingFee:any, deliveryFee?: number): string {
    
    if(deliveryFee) {
      const sum = parseFloat(bookingFee) + deliveryFee
      return (sum.toFixed(2)).toString()
    } else {
      return bookingFee
    }
  }

  async calculateDeliveryDistance(origin: string, destination: string) {
    const service = new google.maps.DistanceMatrixService()

    const request = {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    const response = await new Promise<any>((resolve, reject) => {
      service.getDistanceMatrix(request, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          resolve(response)
        } else {
          reject(status)
        }
      })
    })

    return response.rows[0].elements[0].distance.text
  }

  formatCarAddress(address: any) {
    this.carAddress = `${address.streetNumber} ${address.streetName}, ${address.city}, ${address.province}, ${address.country}, ${address.postalCode}`

    return this.carAddress
  }

  fetchCar() {
    try {
      this._carService.getCar(this.hostId, this.make, this.year).subscribe((response:any) => {
        this.host = response
        this.processImages(this.host.cars[0].images)

        this.profilePic = 'data:image/jpeg;base64,' + this.host.profilePicture;

        this.sortAddress(this.host.cars[0].address)
        this.formatCarAddress(this.host.cars[0].address)

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

   getSessionId() {
    const fromDate = new Date(this.booking.from!)
    const isoFromDate = new Date(fromDate.getTime() - (fromDate.getTimezoneOffset() * 60000)).toISOString()
    const untilDate = new Date(this.booking.until!)
    const isoUntilDate = new Date(untilDate.getTime() - (untilDate.getTimezoneOffset() * 60000)).toISOString()

    const sessionIdDto = {
      cost : Number(this.invoiceTotal!).toFixed(2),
      clientEmail: localStorage.getItem('userEmail')!,
      carName: `${this.host.cars[0].year} ${this.host.cars[0].make} ${this.host.cars[0].model}`,
      fromDate: isoFromDate,
      untilDate: isoUntilDate
    }

    this.booking.clientEmail = localStorage.getItem('userEmail')! 
    this.booking.carId = this.host.cars[0].carId 

    this.booking.cost = this.invoiceTotal
    this.booking.from = isoFromDate
    this.booking.until = isoUntilDate

    localStorage.setItem('bookingObject', JSON.stringify(this.booking))

    this._bookingService.getSessionId(sessionIdDto)
   }

  bookCar() {
    this.booking.clientEmail = localStorage.getItem('userEmail')!
    this.booking.carId = this.host.cars[0].carId

    this.booking.cost = this.invoiceTotal
    
    
    //console.log(this.booking)
    
    try {
      //console.log(sessionIdDto)
      // Make call to stripe checkout service
      this._bookingService.makeBooking(this.booking).subscribe((response: any) => {
      //this._bookingService.getSessionId(sessionIdDto).subscribe((response: any) => {
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
