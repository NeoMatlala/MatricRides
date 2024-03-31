import { Component } from '@angular/core';
import { FaqComponent } from '../faq/faq.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { initFlowbite } from 'flowbite';
declare var Datepicker: any;

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FaqComponent,
    ReviewsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  ngOnInit(): void {
    initFlowbite();
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
