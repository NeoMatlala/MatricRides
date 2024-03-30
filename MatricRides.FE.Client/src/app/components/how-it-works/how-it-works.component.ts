import { Component } from '@angular/core';
import { FaqComponent } from '../faq/faq.component';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    FaqComponent,
    ReviewsComponent
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {

}
