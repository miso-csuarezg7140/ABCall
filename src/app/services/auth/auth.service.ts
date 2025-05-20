import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/abcall/agentes/v1/autenticar`;

  constructor(private http: HttpClient) {}

  autenticarAgente(
    tipoDocumento: string,
    numeroDocumento: string,
    contrasena: string
  ): Observable<any> {
    const body = {
      tipoDocumento,
      numeroDocumento,
      contrasena,
    };

    return this.http.post(this.apiUrl, body);
  }

  guardarDatosAgente(tipoDocumento: string, numeroDocumento: string) {
    localStorage.setItem('tipoDocumento', tipoDocumento);
    localStorage.setItem('numeroDocumento', numeroDocumento);
  }

  obtenerDocumentoAgente(): string | null {
    return localStorage.getItem('documento');
  }
}
