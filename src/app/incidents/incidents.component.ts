import { Component, OnInit } from '@angular/core';
import { IncidentsService } from './incidents.service';

interface Incident {
  id: number;
  title: string;
  description: string;
  status: string;
  history: string;
  imageUrl: string;
}

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  tabActive = true;
  tabDisabled = false;
  incidents: Incident[] = [];

  constructor(private incidentsService: IncidentsService) { }

  ngOnInit(): void {
  
    this.incidentsService.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }
}
