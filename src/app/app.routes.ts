import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: LoginComponent },
    {
        path: 'home', component: HomeComponent
        // canActivate: [AuthGuardService] 
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    // { path: '**', component: PageNotFoundComponent }
];

export { appRoutes };