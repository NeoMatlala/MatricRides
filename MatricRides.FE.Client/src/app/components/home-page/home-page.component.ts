import { Component } from '@angular/core';
import { FaqComponent } from '../faq/faq.component';
import { ReviewsComponent } from '../reviews/reviews.component';

import { Router, RouterLink } from '@angular/router';
import { HomepageSearchComponent } from '../homepage-search/homepage-search.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FaqComponent,
    ReviewsComponent,
    RouterLink,
    HomepageSearchComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private router: Router) {}

  city: string = 'all'

  searchCars(){
    this.router.navigate(['/results', this.city])
  }
}
