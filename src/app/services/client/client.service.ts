import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/abcall/clientes/v1`; 

  constructor(private http: HttpClient) {}

  obtenerClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar`);
  }
}
