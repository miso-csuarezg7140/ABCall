import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { incident } from '../../models/incident.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
})
export class IncidentComponent implements OnInit {
  incidents: incident[] = [];
  incidenteSeleccionado: incident | null = null;

  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerIncidentes();
  }

  obtenerIncidentes(): void {
    const tipoDoc = 'CC';
    const numDoc = '51287946';

    this.incidentService.obtenerIncidentes(tipoDoc, numDoc).subscribe ({
      next: (resp) => {
        this.incidents = resp.data;
      },
      error: err => {
        console.error('Error al obtener los incidentes', err);
      }
    });
  };
  seleccionarIncidente(inc: incident): void {
    this.incidenteSeleccionado = inc;
  }

  irADetalle(id:string): void {
    this.router.navigate(['/incidents/detalle', id]);
  }
}
