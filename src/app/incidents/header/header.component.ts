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
  documento: string = '';

  constructor(
    private http: HttpClient,
    private AuthService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.agente = this.AuthService.obtenerDocumentoAgente();
  }

}
