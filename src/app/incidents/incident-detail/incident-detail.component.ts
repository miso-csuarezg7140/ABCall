import { Component, OnInit } from '@angular/core';

declare var bootstrap: any

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css'],
})
export class IncidentDetailComponent implements OnInit {
  nuevaGestion: string = ''; // Aquí se guarda el texto que el usuario escribe

  incidentes = [
    {
      titulo: 'Cancelación de servicio',
      fecha: '26/04/2025',
      estado: 'Abierto',
    },
    {
      titulo: 'Fallo de internet',
      fecha: '25/04/2025',
      estado: 'En proceso',
    },
    {
      titulo: 'Problema de acceso',
      fecha: '24/04/2025',
      estado: 'Cerrado',
    },
  ];

  constructor() {}

  ngOnInit() {}

  guardarGestion() {
    if (this.nuevaGestion.trim() === '') {
      alert('Por favor, escribe una descripción de la gestión.');
      return;
    }

    console.log('Nueva gestión añadida:', this.nuevaGestion);

    // Aquí hacer un push a un array de gestiones o enviar al backend

    this.nuevaGestion = ''; // Limpiar el campo después de guardar

    // Cerrar el modal (usando Bootstrap 5 por ejemplo)
    const modalElement = document.getElementById('modalAñadirGestion');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }

    alert('¡Gestión añadida con éxito!');
  }
}
