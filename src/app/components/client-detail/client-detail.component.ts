import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentService } from '../../services/incident/incident.service'
import { Incident } from '../../models/incident.model'

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClienteDetailComponent implements OnInit {
  nuevaGestion: string = '';
  detalleIncidente: Incident | null = null;
  alertaVisible: boolean = false;
  urlIncidentes: string = 'https://abcall-gateway-bwh34xmh.uc.gateway.dev/service/abcall';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
     const id = this.route.snapshot.paramMap.get('id'); //Extrae el id desde la URL

    if (id) {
      this.cargaDetalleIncidente(+id);
    } else {
      console.error('ID de incidente no pertenece a la ruta');
    }
  }

    cargaDetalleIncidente(id: number): void {
    this.incidentService.obtenerDetalleIncidente(id).subscribe({
      next: (respuesta) => {
        this.detalleIncidente = respuesta.data;
      },
      error: (error) => {
        console.error('Error al cargar el detalle del incidente', error);
      },
    });
  }

  guardarGestionAIncidente() {
    if (!this.nuevaGestion || this.nuevaGestion.trim() === '') {
      alert('Por favor, escribe una descripción de la gestión.');
      return;
    }

    console.log('Nueva gestión añadida:', this.nuevaGestion);
    this.nuevaGestion = ''; // Limpiar el campo después de guardar

    this.alertaVisible = true;

   // Ocultar la alerta después de 4 segundos
    setTimeout(() => {
      this.alertaVisible = false;
    }, 4000);
  }

  cerrarAlerta(): void {
    this.alertaVisible = false;
  }
}
