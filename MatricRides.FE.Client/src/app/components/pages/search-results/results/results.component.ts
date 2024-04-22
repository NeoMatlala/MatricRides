import { Component } from '@angular/core';
import { ResultsPageSearchComponent } from '../results-page-search/results-page-search.component';
import { CarService } from '../../../../services/cars/car.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingSkeletonComponent } from '../../../loading-skeleton/loading-skeleton.component';
import { SearchService } from '../../../../services/search/search.service';

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
  city: string = ''
  cars: any = []
  searchH1: string = ''


  constructor(private carService: CarService, private searchService: SearchService, private router: Router, private route: ActivatedRoute,) {
    this.route.params.subscribe(params => {
      this.city = params['city']
    })
  }

  ngOnInit(): void {
    try {
      this.searchService.searchCars(this.city).subscribe((response: any) => {

        this.cars = response.cars
        this.searchH1 = response.message
      })
    } catch (error) {
      console.log("Error getting cars:", error)
    }
  }

  //processImages

  seeCar(make:string, id: number, year: number){
    this.router.navigate(["/car-rental", make, id, year])
  }
}
