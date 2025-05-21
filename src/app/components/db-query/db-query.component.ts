import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/client/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-db-query',
  templateUrl: './db-query.component.html',
  styleUrls: ['./db-query.component.css'],
})
export class DbQueryComponent implements OnInit {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  terminoBusqueda: string = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (resp) => {
        if (resp.statusCode === 200) {
          this.clientes = resp.data;
          this.clientesFiltrados = [...this.clientes]; 
          //console.log('Clientes cargados:', this.clientes);
        } else {
          console.error('Error al obtener clientes:', resp.statusDescription);
        }
      },
      error: (err) => {
        console.error('Error en la petición de clientes:', err);
      },
    });
  }

  aplicarBusqueda(): void {
    if (!this.terminoBusqueda) {
      this.clientesFiltrados = [...this.clientes];
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase();

    this.clientesFiltrados = this.clientes.filter(incidente =>
      Object.values(incidente).some(valor =>
        valor && valor.toString().toLowerCase().includes(termino)
      )
    );
  }

  irADetalle(id: string): void {
    this.router.navigate(['/incidents/detail', id]);
  }
}

