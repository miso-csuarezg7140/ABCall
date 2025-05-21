import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident/incident.service';
import { Incident } from '../../models/incident.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from '../../models/client.models';
import { ExcelService } from '../../services/excel/excel.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

declare var bootstrap: any;
@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
})
export class IncidentComponent implements OnInit {
  incidentes: any[] = []; //Modificado
  paginacion: any = {};
  agente: string | null = '';

  incidenteSeleccionado: any = null;
  clientes: Client[] = [];
  terminoBusqueda: string = '';

  nuevoIncidente = {
    tipoDocumentoUsuario: '',
    numDocumentoUsuario: null,
    numDocumentoCliente: null,
    descripcion: '',
  };

  estadoSeleccionado: string = '';
  // Filtro inicial (vacío, se llenará dinámicamente)
  filtro: any = {
    tipoDocUsuario: '',
    numeroDocUsuario: '',
    numeroDocCliente: '',
    fechaCreacion: '',
    pagina: '1',
    tamanioPagina: 5,
    descargar: false,
  };

  filtroSinPaginacion = {
    pagina: 1,
    tamanioPagina: 999,
    descargar: true
  };

  listaIncidentes: any[] = [];

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.obtenerIncidentes();
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
        //console.error('Error al crear incidente:', err);
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
        //console.log('Datos del filtro obtenidos del backend:', data);
        this.incidentes = data.data.data
        this.paginacion = data.data.paginacion
      },
      error: (err) => console.error('Error al cargar el filtro inicial', err),
    });
  }

  aplicarFiltros(): void {
    const filtroAplicado = {
      ...this.filtro,
      estado: this.estadoSeleccionado ? (this.estadoSeleccionado === 'EN_PROCESO' ? 'EN PROCESO' : this.estadoSeleccionado) : '',
      pagina: 1
    };

    this.incidentService.consultarIncidentesFiltrados(filtroAplicado).subscribe({
      next: (data) => {
        this.incidentes = data.data.data;
        this.paginacion = data.data.paginacion;
      },
      error: (err) => console.error('Error al aplicar filtros', err)
    });
  }
  
  obtenerIncidentes(): void {

    this.incidentService.consultarIncidentesFiltrados(this.filtro).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          //console.log('Respuesta del servidor:', response.data.data);
          this.incidentes = response.data.data;
          this.paginacion = response.data.paginacion;

          this.incidentes = response.data.data;
          this.paginacion = response.data.paginacion;
          //console.log('Incidentes asignados:', this.incidentes);
        } else {
          /*console.error(
            'Error al consultar incidentes:',
            response.statusDescription
          );*/
        }
      },
      error: (err) => {
        //console.error('Error en la petición al obtener los incidentes', err);
      },
    });
  }

  incidentessFiltrados(): any[] {
    if (!this.terminoBusqueda) {
      return this.incidentes;
    }

    const termino = this.terminoBusqueda.toLowerCase();
    //console.log("RESULTADO", this.incidentes)

    return this.incidentes.filter(incidente =>
      Object.values(incidente).some(valor =>
        valor && valor.toString().toLowerCase().includes(termino)
      )
    );
  }

  cambiarPagina(pagina: number): void {
    this.filtro.pagina = pagina.toString();
    this.obtenerIncidentes();
  }

  abrirModalVerEstado(incidente: any): void {
    this.incidentService
      .obtenerDetalleIncidente(incidente.id)
      .subscribe((detalle) => {
        //console.log('Detalle completo:', detalle);
        //console.log('Detalle.data:', detalle.data);
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

  seleccionarIncidente(inc: Incident): void {
    this.incidenteSeleccionado = inc;
  }

  irADetalle(id: string): void {
    this.router.navigate(['/incidents/detalle', id]);
  }

  descargarIncidentesComoExcel(): void {
    this.incidentService.consultarIncidentesFiltrados(this.filtroSinPaginacion).subscribe({
      next: (response) => {
        if (response.statusCode === 200 && response.data && response.data.data) {
          const incidentes = response.data.data;

          const dataForExcel = incidentes.map((inc: any) => ({
            ID: inc.id,
            TipoDocumento: inc.tipoDocumentoUsuario,
            DocumentoUsuario: inc.numDocumentoUsuario,
            DocumentoCliente: inc.numDocumentoCliente,
            Descripción: inc.descripcion,
            Estado: inc.estado,
            FechaCreación: inc.fechaCreacion
          }));

          try {
            this.excelService.generateExcel(dataForExcel, 'incidentes.xlsx', 'Incidentes');
          } catch (excelError) {
            Swal.fire('Error de Exportación', 'No se pudo generar el archivo Excel.', 'error');
          }

        } else {
          Swal.fire('Error de Datos', `No se pudieron obtener los incidentes para exportar: ${response.statusDescription || 'Respuesta inesperada.'}`, 'error');
        }
      },
      error: (err) => {
        Swal.fire('Error de Red', 'Ocurrió un error al intentar descargar los incidentes.', 'error');
      }
    });
  }
}
