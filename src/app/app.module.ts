import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { AuthModule } from './modules/auth/auth.module';
import { MembershipModule } from './components/membership/membership.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IncidentComponent } from './components/incident/incident.component';
import { IncidentDetailComponent } from './components/incident-detail/incident-detail.component';
import { DbQueryComponent } from './components/db-query/db-query.component';
import { RegistroIncidenteComponent } from './components/register-incident/register-incident.component';
import { ClienteDetailComponent } from './components/cliente-detail/cliente-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    IncidentComponent,
    IncidentDetailComponent,
    DbQueryComponent,
    RegistroIncidenteComponent,
    ClienteDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    NgxPaginationModule,
    BrowserAnimationsModule,
    AuthModule,
    MembershipModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
