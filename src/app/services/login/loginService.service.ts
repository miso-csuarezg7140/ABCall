import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../settings/appsettings';
import { Login } from '../../interfaces/login';
import { Observable } from 'rxjs';
import { responseLogin } from '../../interfaces/responseLogin';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private baseUrl:string = appsettings.apiUrl

  constructor() { }

  login(objeto:Login): Observable<responseLogin> {
    return this.http.post<responseLogin>(
      `${environment.apiUrl}/abcall/clientes/v1/authenticate`,
      objeto
    );
  }

}
