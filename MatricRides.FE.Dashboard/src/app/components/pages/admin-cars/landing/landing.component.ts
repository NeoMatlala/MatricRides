import { Component } from '@angular/core';
import { CarService } from '../../../../services/cars/car.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  cars: any

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    try {
      this.carService.GetCars().subscribe((response: any) => {console.log(response)
        this.cars = response
      })
    } catch (error) {
      console.log("Could not retrieve cars: ", error)
    }
  }

  getCarDetails(id: number) {
    this.router.navigate(["/view-car-details", id])
  }
}
