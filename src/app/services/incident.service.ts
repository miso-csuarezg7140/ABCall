import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { incidente } from '../models/incident.model';

const API_URL = 'https://abcall-gateway-bwh34xmh.uc.gateway.dev/service/abcall';
@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  constructor(private http: HttpClient) {}

  crearIncidente(incidente: any): Observable<any> {
    return this.http.post(`${API_URL}/incidentes/v1/crear`, incidente);
  }

  obtenerResumen(): Observable<any> {
    return this.http.get(`${API_URL}/resumen`);
  }

  obtenerIncidentes(
    tipoDocUsuario: string,
    numeroDocUsuario: number
  ): Observable<{ data: incidente[] }> {
    const url = `${API_URL}/incidentes/v1/consultar?tipoDocUsuario=${tipoDocUsuario}&numeroDocUsuario=${numeroDocUsuario}`;
    return this.http.get<{ data: incidente[] }>(url);
  }

  obtenerDetalleIncidente(id: number): Observable<any> {
    return this.http.get<any>(
      `${API_URL}/incidentes/v1/consultarDetalle?idIncidente=${id}`
    );
  }

  obtenerTodosLosClientes(): Observable<any> {
    return this.http.get(`${API_URL}/clientes/v1/listar`);
  }
}
