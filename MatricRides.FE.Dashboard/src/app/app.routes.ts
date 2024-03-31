import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { DashboardMainLayoutComponent } from './components/dashboard-main-layout/dashboard-main-layout.component';

export const routes: Routes = [
    {path: '', redirectTo:'/login', pathMatch: 'full'},
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {path: 'login', component: LoginPageComponent}
        ]
    },
    {
        path: '',
        component: DashboardMainLayoutComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
        ]
    }
];
