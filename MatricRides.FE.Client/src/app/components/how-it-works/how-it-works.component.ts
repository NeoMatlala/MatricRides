import { Component } from '@angular/core';
import { FaqComponent } from '../faq/faq.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    FaqComponent,
    ReviewsComponent,
    RouterLink
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {

}
