import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterClientComponent } from '../../components/register-client/register-client.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterClientComponent
  ],
  exports: [
    LoginComponent,
    RegisterClientComponent
  ]
})
export class AuthModule { }
