import { Routes } from '@angular/router';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HostApplicationFormComponent } from './components/pages/host-application-form/host-application-form.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'how-it-works', component: HowItWorksComponent},
    {path: 'host-application-form', component: HostApplicationFormComponent}
];