import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PlansComponent } from './membership/plans/plans.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { PrincipalComponent } from './home/principal/principal.component';

const routes: Routes = [
  { path: 'plans', component: PlansComponent },

  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },

  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'principal', component: PrincipalComponent },
    ],
  },

  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
