import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { incidente } from '../../models/incident.model';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/cliente.models';
import { AuthService } from '../../services/auth/auth.service'

declare var bootstrap: any;

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
})
export class IncidentComponent implements OnInit {
  incidentes: any[] = []; //Modificado
  paginacion: any = {};

  incidenteSeleccionado: any = null;
  clientes: Cliente[] = [];
  nuevoIncidente = {
    tipoDocumentoUsuario: '',
    numDocumentoUsuario: null,
    numDocumentoCliente: null,
    descripcion: '',
  };

  // Filtro inicial (vacío, se llenará dinámicamente)
  // filtro: any = {
  //   tipoDocUsuario: '',
  //   numeroDocUsuario: '',
  //   numeroDocCliente: '',
  //   estado: '',
  //   fechaInicio: '',
  //   fechaFin: '',
  //   pagina: '1',
  //   tamanioPagina: 5,
  //   descargar: false,
  // };

  filtro = {
    tipoDocUsuario: '1',
    numeroDocUsuario: '51287946',
    numeroDocCliente: '1010101010',
    estado: 'ACTIVO',
    fechaInicio: '2025/01/01',
    fechaFin: '2025/06/30',
    pagina: '1',
    tamanioPagina: 5,
    descargar: false,
    // descripcion: ""
  };

  listaIncidentes: any[] = [];

  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerIncidentes();
    this.obtenerClientes();
    this.cargarFiltroIncidentes();
  }

  //METODOS
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

  cargarFiltroIncidentes() {
    const filtroInicial = {
      tipoDocUsuario: '',
      numeroDocUsuario: '',
      numeroDocCliente: '',
      estado: '',
      fechaInicio: '',
      fechaFin: '',
      pagina: 1,
      tamanioPagina: 5,
      descargar: false,
    };

    this.incidentService.consultarIncidentesFiltrados(filtroInicial).subscribe({
      next: (data) => {
        console.log('Datos del filtro obtenidos del backend:', data);
        // Asignación de valores...
        this.listarIncidentes();
      },
      error: (err) => console.error('Error al cargar el filtro inicial', err),
    });
  }

  listarIncidentes() {
    this.incidentService.obtenerIncidentes(this.filtro).subscribe({
      next: (response) => {
        console.log('Incidentes obtenidos:', response);
        this.incidentes = response.data;
        this.paginacion = response.data.paginacion;
      },
      error: (err) => console.error('Error al listar incidentes', err),
    });
  }

  obtenerIncidentes(): void {
    this.incidentService.obtenerIncidentes(this.filtro).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          console.log('Respuesta del servidor:', response.data.data);
          this.incidentes = response.data.data;
          this.paginacion = response.data.paginacion;
          if (response.data.data.length > 0) {
            console.log('Datos correctamente recibidos y asignados.');
          } else {
            console.warn('La respuesta está vacía.');
          }

          this.incidentes = response.data.data;
          this.paginacion = response.data.paginacion;
          console.log('Incidentes asignados:', this.incidentes);
        } else {
          console.error(
            'Error al consultar incidentes:',
            response.statusDescription
          );
        }
      },
      error: (err) => {
        console.error('Error en la petición al obtener los incidentes', err);
      },
    });
  }

  cambiarPagina(pagina: number): void {
    this.filtro.pagina = pagina.toString();
    this.obtenerIncidentes();
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
    const modal = new bootstrap.Modal(
      document.getElementById('modalRegistroIncidente')!
    );
    modal.show();
  }

  seleccionarIncidente(inc: incidente): void {
    this.incidenteSeleccionado = inc;
  }

  irADetalle(id: string): void {
    this.router.navigate(['/incidents/detalle', id]);
  }
}
