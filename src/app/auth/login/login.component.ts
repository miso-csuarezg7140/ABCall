import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/loginService.service';
import { AuthService } from '../../services/auth/auth.service';
import { Login } from '../../interfaces/login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ViewChild, ElementRef } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  tipoUsuario: string = 'cliente';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  contrasena: string = '';

  private apiUrl = `${environment.apiUrl}/abcall`;

  @ViewChild('modalClienteConstruccion', { static: false })
  modalRef!: ElementRef;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    if (this.tipoUsuario === 'agente') {
      const datosAgente = {
        tipoDocumento: this.tipoDocumento,
        numeroDocumento: this.numeroDocumento,
        contrasena: this.contrasena,
      };
      this.loginService.loginAgente(datosAgente).subscribe({
        next: (response) => {
          console.log("RESPUESTA: ", response)
          this.router.navigate(['/incidents'])
          localStorage.setItem('documento', datosAgente.numeroDocumento)
        },
        error: () =>
          this.snackBar.open('Error al iniciar sesión como agente.', 'Cerrar', {
            duration: 3000,
          }),
      });
    } else {
      const datosCliente = {
        numeroDocumento: this.numeroDocumento,
        contrasena: this.contrasena,
      };
      this.loginService.loginCliente(datosCliente).subscribe({
        next: () => {
          const modal = new bootstrap.Modal(
            document.getElementById('modalClienteConstruccion')
          );
          modal.show();
        },
        error: () =>
          this.snackBar.open(
            'Error al iniciar sesión como cliente.',
            'Cerrar',
            {
              duration: 3000,
            }
          ),
      });
    }
  }
}
