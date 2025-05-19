import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/abcall/clientes/v1/autenticar`;

  agente: string | null = '';

  constructor(
    private http: HttpClient,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.agente = this.AuthService.obtenerDocumentoAgente();
    this.obtenerDatosAgente();
  }

  obtenerDatosAgente(): void {
    // Encabezados si necesitas un token de autenticación
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Si usas JWT
    });

    // Petición al backend sin parámetros, solo el token en headers
    this.http.get(this.apiUrl, { headers }).subscribe({
      next: (response: any) => {
        console.log('Respuesta del backend:', response);
        if (response && response.data) {
          this.agente = response.data.numeroDocumento;
        } else {
          console.warn('No se encontraron datos del agente');
        }
      },
      error: (error) => {
        console.error('Error al obtener datos del agente:', error);
      },
    });
  }
}
