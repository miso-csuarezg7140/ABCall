import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthComponent,
                 LoginComponent,
                 RegisterComponent
  ],
  exports: [LoginComponent,
            RegisterComponent]
})
export class AuthModule { }
