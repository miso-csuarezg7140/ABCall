import { Component } from '@angular/core';
import { IncidentService } from '../../services/incident/incident.service';

@Component({
  selector: 'app-registro-incidente',
  templateUrl: './register-incident.component.html',
  styleUrl: './register-incident.component.css'
})
export class RegistroIncidenteComponent {

  incidente = {
    tipoDocumentoUsuario: '',
    numDocumentoUsuario: null,
    numDocumentoCliente: null,
    descripcion: ''
  };

  constructor(private incidentService: IncidentService) {}

crearIncidente() {
  this.incidentService.crearIncidente(this.incidente).subscribe(
    response => {
      alert('Incidente registrado exitosamente');
      this.incidente = {
        tipoDocumentoUsuario: '',
        numDocumentoUsuario: null,
        numDocumentoCliente: null,
        descripcion: ''
      };
    },
    error => {
      alert('Error al registrar el incidente');
      console.error(error);
    }
  );
}

}
