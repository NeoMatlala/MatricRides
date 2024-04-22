import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { SearchService } from '../../services/search/search.service';
import { Router } from '@angular/router';

declare var Datepicker: any;

@Component({
  selector: 'app-homepage-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './homepage-search.component.html',
  styleUrl: './homepage-search.component.css'
})
export class HomepageSearchComponent {

  constructor(private searchService: SearchService, private router: Router) {}

  city: string = ''

  ngOnInit(): void {
    initFlowbite();
  }

  searchCars(city: string){
    this.router.navigate(['/results', city])
    // try {
    //   this.searchService.searchCars(city).subscribe((response:any) => {
    //     console.log(response)
    //   })
    // } catch (error) {
    //   console.log("Error searching for cars: ", error)
    // }
  }

  initDatePicker() : void {
    const datepickerEl = document.getElementById('datepickerId');
    new Datepicker(datepickerEl, {
        // options
    });
  }

  initUntilDatePicker() : void {
    const datepickerEl = document.getElementById('untilDatePicker');
    new Datepicker(datepickerEl, {
        // options
    });
  }
}
