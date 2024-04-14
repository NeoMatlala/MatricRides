import { Routes } from '@angular/router';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HostApplicationFormComponent } from './components/pages/host-application-form/host-application-form.component';
import { ResultsComponent } from './components/pages/search-results/results/results.component';
import { CarRentalComponent } from './components/pages/search-results/car-rental/car-rental.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'how-it-works', component: HowItWorksComponent},
    {path: 'host-application-form', component: HostApplicationFormComponent},
    {path: 'results', component: ResultsComponent},
    {path: 'car-rental/:make/:id/:year', component: CarRentalComponent},
];