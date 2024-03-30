import { Component } from '@angular/core';
import { FaqComponent } from '../faq/faq.component';
import { ReviewsComponent } from '../reviews/reviews.component';

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

}
