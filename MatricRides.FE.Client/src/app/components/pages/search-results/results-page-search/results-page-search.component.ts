import { Component } from '@angular/core';
import { HomepageSearchComponent } from '../../../homepage-search/homepage-search.component';

@Component({
  selector: 'app-results-page-search',
  standalone: true,
  imports: [HomepageSearchComponent],
  templateUrl: './results-page-search.component.html',
  styleUrl: './results-page-search.component.css'
})
export class ResultsPageSearchComponent {

}
