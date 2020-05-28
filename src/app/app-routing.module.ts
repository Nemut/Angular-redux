import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuardGuard } from './services/guards/login-guard.guard';

// Paginas
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    // canActivate: [LoginGuardGuard],
    canLoad: [LoginGuardGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
