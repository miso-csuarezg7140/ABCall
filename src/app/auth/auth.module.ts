import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthComponent,
                 LoginComponent
  ],
  exports: [LoginComponent]
})
export class AuthModule { }
