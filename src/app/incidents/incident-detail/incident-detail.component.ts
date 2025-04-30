import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentService } from '../../services/incident.service'
import { incident } from '../../models/incident.model'

declare var bootstrap: any

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css'],
})
export class IncidentDetailComponent implements OnInit {
  nuevaGestion: string = '';
  detalleIncidente: any = null;
  urlIncidentes: string = 'https://abcall-gateway-bwh34xmh.uc.gateway.dev/service/abcall';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    // urlIncidentes = 'https://abcall-gateway-bwh34xmh.uc.gateway.dev/service/abcall';
    const id = this.route.snapshot.paramMap.get('id'); //Extrae el id desde la URL

    if (id) {
      this.cargaDetalleIncidente(id);
    } else {
      console.error('ID de incidente no pertenece a la ruta');
    }
  }

    cargaDetalleIncidente(id: String): void {
      const url = `${this.urlIncidentes}/incidentes/v1/consultarDetalle?idIncidente=${id}`;

      this.http.get<any>(url).subscribe ({
        next: (response) => {
          if (response?.statusCode === 200) {
            this.detalleIncidente = response.data;
          } else {
            console.error('Respuesta inesperada', response);
          }
        },
        error: (error) => {
          console.error('Error al obtener detalle del incidente:', error);
        },
      });
      // this.incidentService.obtenerIncidentesPorId(id).subscribe ({
      //   next: (resp) => {
      //     this.incidente = resp.data;
      //   },
      //   error: (err) => {
      //    console.error('Error al cargar el deatalle del incidente', err);
      //   }
      // })
    //}

    // const url = `${this.urlIncidentes}/incidentes/v1/consultarDetalle?idIncidente=${idIncidente}`;

    // this.http.get<any>(url).subscribe({
    //   next: (response) => {
    //     if (response?.statusCode === 200) {
    //       this.detalleIncidente = response.data;
    //     } else {
    //       console.error('Respuesta inesperada', response);
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Error al obtener detalle del incidente:', error);
    //   },
    // });
  }

  guardarGestion() {
    if (this.nuevaGestion.trim() === '') {
      alert('Por favor, escribe una descripción de la gestión.');
      return;
    }

    console.log('Nueva gestión añadida:', this.nuevaGestion);

    this.nuevaGestion = ''; // Limpiar el campo después de guardar

    const modalElement = document.getElementById('modalAñadirGestion');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }

    alert('¡Gestión añadida con éxito!');
  }
}
