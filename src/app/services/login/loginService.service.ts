import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Login } from '../../interfaces/login';
import { responseLogin } from '../../interfaces/responseLogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/abcall`;

  constructor() {}

  // Cliente
  loginCliente(data: Login): Observable<responseLogin> {
    return this.http.post<responseLogin>(
      `${this.baseUrl}/clientes/v1/autenticar`,
      data
    );
  }

  // Agente
  loginAgente(data: {
    tipoDocumento: string;
    numeroDocumento: string;
    contrasena: string;
  }): Observable<responseLogin> {
    return this.http.post<responseLogin>(
      `${this.baseUrl}/agentes/v1/autenticar`,
      data
    );
  }
}
