import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginClient } from '../../interfaces/login-client';
import { ResponseLoginClient } from '../../interfaces/response-login-client';
import { LoginAgent } from '../../interfaces/login-agent';
import { ResponseLoginAgent } from '../../interfaces/response-login-agent';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/abcall`;

  constructor() {}

  // Cliente
  loginCliente(data: LoginClient): Observable<ResponseLoginClient> {
    return this.http.post<ResponseLoginClient>(
      `${this.baseUrl}/clientes/v1/autenticar`,
      data
    );
  }

  // Agente
  loginAgente(data: LoginAgent): Observable<ResponseLoginAgent> {
    return this.http.post<ResponseLoginAgent>(
      `${this.baseUrl}/agentes/v1/autenticar`,
      data
    );
  }

  guardarDatosAgente(tipoDocumento: string, numeroDocumento: string) {
    localStorage.setItem('tipoDocumento', tipoDocumento);
    localStorage.setItem('numeroDocumento', numeroDocumento);
  }

  obtenerDocumentoAgente(): string | null {
    return localStorage.getItem('documento');
  }
}
