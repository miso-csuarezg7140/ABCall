import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/abcall/clientes/v1/autenticar`;

  agente: string | null = '';
  documento: string = '';

  constructor(
    private http: HttpClient,
    private LoginService: LoginService
  ) {

  }

  ngOnInit(): void {
    this.agente = this.LoginService.obtenerDocumentoAgente();
  }

}
