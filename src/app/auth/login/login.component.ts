import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/loginService.service';
import { Login } from '../../interfaces/login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // onLogin() {
  //   const credentials: login = {
  //     username: this.username,
  //     password: this.password,
  //   };

  //   this.loginService.login(credentials).subscribe(
  //     (res) => {
  //       console.log('Login exitoso', res);
  //       this.router.navigate(['/plans']);
  //     },
  //     (err) => {
  //       console.error('Error al iniciar sesión', err);
  //       if (err.status === 401) {
  //         this.snackBar.open('Usuario o contraseña incorrectos.', 'Cerrar', {
  //           duration: 3000,
  //         });
  //       } else {
  //         this.snackBar.open(
  //           'Ocurrió un error, inténtalo más tarde.',
  //           'Cerrar',
  //           {
  //             duration: 3000,
  //           }
  //         );
  //       }
  //     }
  //   );
  // }

  onLogin() {
    const credentials: Login = {
      username: this.username,
      password: this.password,
    };

    this.loginService.login(credentials).subscribe(
      (res) => {
        console.log('Login exitoso', res);
        this.router.navigate(['/incidents']);
      },
      (err) => {
        console.error('Error al iniciar sesión', err);
        if (err.status === 401) {
          alert('Usuario o contraseña incorrectos.');
        } else {
          alert('Ocurrió un error, inténtalo más tarde.');
        }
      }
    );
  }

  ngOnInit(): void {}
}
