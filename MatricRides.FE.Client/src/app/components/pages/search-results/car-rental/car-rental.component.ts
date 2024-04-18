import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { CarService } from '../../../../services/cars/car.service';
import { CarouselModule } from '@coreui/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Carousel, CarouselInterface, CarouselItem, CarouselOptions, InstanceOptions } from 'flowbite';

@Component({
  selector: 'app-car-rental',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink, ],
  templateUrl: './car-rental.component.html',
  styleUrl: './car-rental.component.css'
})
export class CarRentalComponent {
  host: any = {}
  hostId: number = 0
  make: string = ''
  year: number = 0
  imageSrc: string[] = []

  slides: any[] = new Array(3).fill({src: ''});

  constructor(private _carService: CarService, private router: ActivatedRoute, private elementRef: ElementRef) {
    this.router.params.subscribe(params => {
      this.hostId = params['id']
      this.make = params['imake']
      this.year = params['year']
    })
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
  }



  fetchCar() {
    try {
      this._carService.getCar(this.hostId, this.make, this.year).subscribe((response:any) => {
        this.host = response
        this.processImages(this.host.cars[0].images)

        //console.log(this.imageSrc)
        //this.slides = this.imageSrc.map(src => ({ src }));

        //this.slides[0] = {s}

        console.log(this.imageSrc)
        
      })
    } catch (error) {
      console.log("Error fetching car:", error)
    }
  }

  processImages(images: any[]): void {
    
    images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image.carImage;
      this.imageSrc.push(src)
    })
  }
}
