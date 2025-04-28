import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = 'https://abcall-gateway-bwh34xmh.uc.gateway.dev/service/abcall/crear'; 

  constructor(private http: HttpClient) { }

  crearIncidente(incidente: any): Observable<any> {
    return this.http.post(this.apiUrl, incidente);
  }

  obtenerResumen(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen`);
  }
}