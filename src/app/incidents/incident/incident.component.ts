import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { incidente } from '../../models/incident.model';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/cliente.models'

declare var bootstrap: any;

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
})
export class IncidentComponent implements OnInit {
  // incidentes: incidente[] = [];
  incidentes: any[] = []; //Modificado
  incidenteSeleccionado: any = null;
  clientes: Cliente[] = [];
  nuevoIncidente = {
    tipoDocumentoUsuario: 'CC',
    numDocumentoUsuario: 51287946, // puedes obtenerlo de un usuario logueado si aplica
    numDocumentoCliente: null,
    descripcion: '',
  };

  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerIncidentes();
    this.obtenerClientes();
  }

  crearIncidente(): void {
    if (
      !this.nuevoIncidente.numDocumentoCliente ||
      !this.nuevoIncidente.descripcion.trim()
    ) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    this.incidentService.crearIncidente(this.nuevoIncidente).subscribe({
      next: (resp) => {
        Swal.fire('Éxito', 'Incidente creado con éxito.', 'success');
        const modal = bootstrap.Modal.getInstance(
          document.getElementById('modalRegistroIncidente')!
        );
        modal?.hide();
        this.obtenerIncidentes(); // recargar la lista
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('Error al crear incidente:', err);
        Swal.fire('Error', 'No se pudo crear el incidente.', 'error');
      },
    });
  }

  limpiarFormulario(): void {
    this.nuevoIncidente.numDocumentoCliente = null;
    this.nuevoIncidente.descripcion = '';
  }

  obtenerIncidentes(): void {
    const tipoDocUsuario = 'CC';
    const numeroDocUsuario = 51287946;

    this.incidentService
      .obtenerIncidentes(tipoDocUsuario, numeroDocUsuario)
      .subscribe({
        next: (resp) => {
          this.incidentes = resp.data;
        },
        error: (err) => {
          console.error('Error al obtener los incidentes', err);
        },
      });
  }

  obtenerClientes(): void {
    this.incidentService.obtenerTodosLosClientes().subscribe({
      next: (resp) => {
        this.clientes = resp;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      },
    });
  }

  abrirModalVerEstado(incidente: any): void {
    this.incidentService
      .obtenerDetalleIncidente(incidente.id)
      .subscribe((detalle) => {
        console.log('Detalle completo:', detalle);
        console.log('Detalle.data:', detalle.data);
        this.incidenteSeleccionado = incidente;
        const modal = new bootstrap.Modal(
          document.getElementById('modalVerEstado')!
        );
        modal.show();
      });
  }

  abrirModalRegistro(): void {
    const modal = new bootstrap.Modal(document.getElementById('modalRegistroIncidente')!);
    modal.show();
  }

  seleccionarIncidente(inc: incidente): void {
    this.incidenteSeleccionado = inc;
  }

  irADetalle(id: string): void {
    this.router.navigate(['/incidents/detalle', id]);
  }
}
