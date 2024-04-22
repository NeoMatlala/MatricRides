import { Component, ElementRef } from '@angular/core';
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
  showDropDown: boolean = false
  relevant: boolean = false
  descending: boolean = false
  ascending: boolean = false

  constructor(private carService: CarService, private searchService: SearchService, private router: Router, private route: ActivatedRoute,) {
    this.route.params.subscribe(params => {
      this.city = params['city']
    })
  }

  ngOnInit(): void {
    this.fetchInitialData()
    this.showDropDown = false
  }

  showdropdown() {
    this.showDropDown = !this.showDropDown
  }

  fetchInitialData() {
    this.cars = []

    try {
      this.searchService.searchCars(this.city).subscribe((response: any) => {

        this.cars = response.cars
        this.searchH1 = response.message
      })
    } catch (error) {
      console.log("Error getting cars:", error)
    }

    this.relevant = true
    this.descending = false
    this.ascending = false
    this.showDropDown = !this.showDropDown
  }

  filterDescending() {
    this.cars = []

    try {
      this.searchService.descendingHourlyRate(this.city).subscribe((response: any) => {

        this.cars = response.cars
        this.searchH1 = response.message
      })
    } catch (error) {
      console.log("Error getting cars:", error)
    }

    this.showDropDown = !this.showDropDown
    this.relevant = false
    this.descending = true
    this.ascending = false
  }

  filterAscending() {
    this.cars = []

    try {
      this.searchService.ascendingHourlyRate(this.city).subscribe((response: any) => {

        this.cars = response.cars
        this.searchH1 = response.message
      })
    } catch (error) {
      console.log("Error getting cars:", error)
    }

    this.showDropDown = !this.showDropDown
    this.relevant = false
    this.descending = false
    this.ascending = true
  }

  seeCar(make:string, id: number, year: number){
    this.router.navigate(["/car-rental", make, id, year])
  }
}
