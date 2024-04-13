import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { DashboardMainLayoutComponent } from './components/dashboard-main-layout/dashboard-main-layout.component';
import { LandingComponent } from './components/pages/host-applications/landing/landing.component';
import { ReviewComponent } from './components/pages/host-applications/review/review.component';
import { CreateHostAccountComponent } from './components/forms/create-host-account/create-host-account.component';

export const routes: Routes = [
    {path: '', redirectTo:'/login', pathMatch: 'full'},
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {path: 'login', component: LoginPageComponent},
            {path: 'create-host-account', component: CreateHostAccountComponent},
        ]
    },
    {
        path: '',
        component: DashboardMainLayoutComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'host-applications', component: LandingComponent},
            {path: 'review-application/:id', component: ReviewComponent},
        ]
    }
];
