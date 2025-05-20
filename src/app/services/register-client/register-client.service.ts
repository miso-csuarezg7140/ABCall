import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Register } from '../../interfaces/register';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseRegister } from '../../interfaces/response-register';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // registerClient(cliente: Register) {
  //   throw new Error('Method not implemented.');
  // }
  private http = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;

  constructor() {}

  registerClient(objeto: Register): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(
      `${this.baseUrl}/abcall/clientes/v1/registrar`,
      objeto
    );
  }
}
