import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroIncidenteComponent } from './registro-incidente.component';

describe('RegistroIncidenteComponent', () => {
  let component: RegistroIncidenteComponent;
  let fixture: ComponentFixture<RegistroIncidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroIncidenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
