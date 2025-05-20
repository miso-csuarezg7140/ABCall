import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PlansComponent } from './membership/plans/plans.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './incidents/header/header.component';
import { FooterComponent } from './incidents/footer/footer.component';
import { IncidentComponent } from './incidents/incident/incident.component';
import { IncidentDetailComponent } from './incidents/incident-detail/incident-detail.component';
import { DbQueryComponent } from './incidents/db-query/db-query.component';
import { ClienteDetailComponent } from './incidents/cliente-detail/cliente-detail.component';

const routes: Routes = [
  { path: 'plans', component: PlansComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  // { path: 'incident-detail', component: IncidentDetailComponent },

  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  {
    path: 'incidents',
    component: HomeComponent,
    children: [
      { path: '', component: IncidentComponent },
      { path: 'incident-detail', component: IncidentDetailComponent },
      { path: 'detail/:id', component: ClienteDetailComponent },
      { path: 'db-query', component: DbQueryComponent },
      { path: 'detalle/:id', component: IncidentDetailComponent }
    ],
  },
  // { path: 'registro-incidente', component: RegistroIncidenteComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
