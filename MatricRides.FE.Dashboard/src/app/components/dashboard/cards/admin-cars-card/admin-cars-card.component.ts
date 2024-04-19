import { Component } from '@angular/core';
import { CarService } from '../../../../services/cars/car.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-cars-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-cars-card.component.html',
  styleUrl: './admin-cars-card.component.css'
})
export class AdminCarsCardComponent {

  approvedCarCount: number = 0

  constructor(private carService: CarService) {}

  ngOnInit() {
    try {
      this.carService.GetCarsLength().subscribe((response: any) => {
        this.approvedCarCount = response
      })
    } catch (error) {
      console.log("Could not retrieve cars: ", error)
    }
  }
}
