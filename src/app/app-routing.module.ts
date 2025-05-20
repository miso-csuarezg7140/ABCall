import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { PlansComponent } from './components/plans/plans.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IncidentComponent } from './components/incident/incident.component';
import { IncidentDetailComponent } from './components/incident-detail/incident-detail.component';
import { DbQueryComponent } from './components/db-query/db-query.component';
import { ClienteDetailComponent } from './components/client-detail/client-detail.component';

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
      { path: 'register', component: RegisterClientComponent },
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
