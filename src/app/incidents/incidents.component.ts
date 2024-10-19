import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {

  tabActive = true;
  tabDisabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
