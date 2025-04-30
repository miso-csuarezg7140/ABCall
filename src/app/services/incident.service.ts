import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = 'https://abcall-gateway-bwh34xmh.uc.gateway.dev/service/abcall';

  constructor(private http: HttpClient) { }

  crearIncidente(incidente: any): Observable<any> {
    return this.http.post(this.apiUrl, incidente);
  }

  obtenerResumen(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen`);
  }

  obtenerIncidentes(TipoDoc: string, numDoc: string): Observable<any> {
    // const
    const url = `${this.apiUrl}/incidentes/v1/consultar?tipoDocUsuario=${TipoDoc}&numeroDocUsuario=${numDoc}`;
    // .set('tipoDocUsuario', TipoDoc)
    // .set('numeroDocUsuario', numDoc);

    // return this.http.get(`${this.apiUrl}/consultar`, {params});
    return this.http.get<any>(url);
  }
}
