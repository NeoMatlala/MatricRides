import { Component } from '@angular/core';
import { ResultsPageSearchComponent } from '../results-page-search/results-page-search.component';
import { CarService } from '../../../../services/cars/car.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoadingSkeletonComponent } from '../../../loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    ResultsPageSearchComponent,
    CommonModule,
    RouterLink,
    LoadingSkeletonComponent
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

  hostObj: any = []

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    try {
      this.carService.getAllCars().subscribe((response: any) =>{
       // this.carsArray = response.map((obj: any)=> obj.cars).flat()
       this.hostObj = response
      })
    } catch (error) {
      console.log("Error getting cars:", error)
    }
  }

  seeCar(make:string, id: number, year: number){
    this.router.navigate(["/car-rental", make, id, year])
  }
}
