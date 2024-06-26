import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { DashboardMainLayoutComponent } from './components/dashboard-main-layout/dashboard-main-layout.component';
import { LandingComponent } from './components/pages/host-applications/landing/landing.component';
import { ReviewComponent } from './components/pages/host-applications/review/review.component';
import { CreateHostAccountComponent } from './components/forms/create-host-account/create-host-account.component';
import { ViewCarComponent } from './components/pages/car/view-car/view-car.component';
import { AdminCarsCardComponent } from './components/dashboard/cards/admin-cars-card/admin-cars-card.component';
import { LandingComponent as AdminCarsLanding } from './components/pages/admin-cars/landing/landing.component';
import { ViewCarComponent as AdminViewCar } from './components/pages/admin-cars/view-car/view-car.component';
import { LandingComponent as AdminUsersLanding } from './components/pages/users/landing/landing.component';
import { LandingComponent as HostCarLanding } from './components/pages/car/landing/landing.component';
import { LandingComponent as AdminMessagesLanding } from './components/pages/messages/landing/landing.component';
import { ProfilePageComponent } from './components/pages/host-profile/profile-page/profile-page.component';
import { BookingsLandingComponent } from './components/pages/host-bookings/bookings-landing/bookings-landing.component';

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
            {path: 'review-application/:id', component: ReviewComponent},
            {path: 'view-car/:make', component: ViewCarComponent},
            {path: 'cars', component: AdminCarsLanding},
            {path: 'bookings', component: BookingsLandingComponent},
            {path: 'messages', component: AdminMessagesLanding},
            {path: 'view-car-details/:id', component: AdminViewCar},
            {path: 'users', component: AdminUsersLanding},
            {path: 'host-cars', component: HostCarLanding},
            {path: 'profile/:email', component: ProfilePageComponent},
        ]
    }
];
