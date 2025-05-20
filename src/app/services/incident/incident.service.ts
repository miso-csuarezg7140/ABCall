import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { incidente } from '../../models/incident.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private apiUrl = `${environment.apiUrl}/abcall/incidentes/v1`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  constructor(private http: HttpClient) {}

  // METODOS:
  crearIncidente(incidente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, incidente, {
      headers: this.headers,
    });
  }

  obtenerResumen(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen`, {
      headers: this.headers,
    });
  }

  consultarIncidentesFiltrados(filtro: any): Observable<any> {
    const defaultFilter = {
      tipoDocUsuario: '',
      numeroDocUsuario: '',
      numeroDocCliente: '',
      estado: '',
      fechaInicio: '',
      fechaFin: '',
      pagina: 1,
      tamanioPagina: 5,
      descargar: false,
    };

    // Mezcla el filtro inicial con los valores recibidos
    const body = { ...defaultFilter, ...filtro };

    // Eliminar claves con valores vacíos, nulos o no numéricos para evitar errores en el backend
    Object.keys(body).forEach((key) => {
      if (body[key] === '' || body[key] === null || body[key] === undefined) {
        delete body[key];
      }
    });

    // Validar si las fechas son válidas, si no, eliminarlas
    if (body.fechaInicio && isNaN(Date.parse(body.fechaInicio))) {
      delete body.fechaInicio;
    }
    if (body.fechaFin && isNaN(Date.parse(body.fechaFin))) {
      delete body.fechaFin;
    }


    return this.http.post<any>(`${this.apiUrl}/consultar`, body, {
      headers: this.headers,
    });
  }

  obtenerIncidentes(filtro: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/consultar`, filtro, {
      headers: this.headers,
    });
  }

  obtenerDetalleIncidente(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/consultarDetalle?idIncidente=${id}`,
      { headers: this.headers }
    );
  }

  obtenerTodosLosClientes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/clientes/v1/listar`, {
      headers: this.headers,
    });
  }
}
