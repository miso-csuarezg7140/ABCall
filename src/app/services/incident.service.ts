import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { incidente } from '../models/incident.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private apiUrl = `${environment.apiUrl}/abcall/incidentes/v1`
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) {}

  crearIncidente(incidente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, incidente, { headers: this.headers });
  }

  obtenerResumen(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen`, { headers: this.headers });
  }

  obtenerIncidentes(filtro: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/consultar`,
      filtro,
      { headers: this.headers }
    );
  }

  obtenerDetalleIncidente(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/consultarDetalle?idIncidente=${id}`,
      { headers: this.headers }
    );
  }

  obtenerTodosLosClientes(): Observable<any> {
    return this.http.get(`${environment}/clientes/v1/listar`);
  }
}
