import { Component } from '@angular/core';
import { CarService } from '../../../../services/cars/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-rental',
  standalone: true,
  imports: [],
  templateUrl: './car-rental.component.html',
  styleUrl: './car-rental.component.css'
})
export class CarRentalComponent {
  host: any = {}
  hostId: number = 0
  make: string = ''
  year: number = 0

  constructor(private _carService: CarService, private router: ActivatedRoute) {
    this.router.params.subscribe(params => {
      this.hostId = params['id']
      this.make = params['imake']
      this.year = params['year']
    })
  }

  ngOnInit() {
    try {
      this._carService.getCar(this.hostId, this.make, this.year).subscribe((response:any) => {
        this.host = response
      })
    } catch (error) {
      console.log("Error fetching car:", error)
    }
  }
}
