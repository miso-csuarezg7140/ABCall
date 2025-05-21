import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { IncidentDetailComponent } from './incident-detail.component';
import { IncidentService } from '../../services/incident/incident.service';
import { Incident } from '../../models/incident.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('IncidentDetailComponent', () => {
  let component: IncidentDetailComponent;
  let fixture: ComponentFixture<IncidentDetailComponent>;
  let mockIncidentService: jasmine.SpyObj<IncidentService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Create mock for IncidentService
    mockIncidentService = jasmine.createSpyObj('IncidentService', ['obtenerDetalleIncidente']);
    
    // Create mock for ActivatedRoute with paramMap
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [IncidentDetailComponent],
      providers: [
        { provide: IncidentService, useValue: mockIncidentService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.nuevaGestion).toBe('');
    expect(component.detalleIncidente).toBeNull();
    expect(component.alertaVisible).toBeFalse();
    expect(component.urlIncidentes).toBe('https://abcall-gateway-bwh34xmh.uc.gateway.dev/service/abcall');
  });

  it('should load incident detail when valid ID is provided in route', () => {
    // Arrange
    const mockId = '123';
    const mockResponse = { 
      data: { 
        id: 123, 
        descripcion: 'Test incident' 
      } as Incident 
    };
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(mockId);
    mockIncidentService.obtenerDetalleIncidente.and.returnValue(of(mockResponse));

    // Act
    component.ngOnInit();

    // Assert
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(mockIncidentService.obtenerDetalleIncidente).toHaveBeenCalledWith(123);
    expect(component.detalleIncidente).toEqual(mockResponse.data);
  });

  it('should log error when ID is not provided in route', () => {
    // Arrange
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(null);
    spyOn(console, 'error');

    // Act
    component.ngOnInit();

    // Assert
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(mockIncidentService.obtenerDetalleIncidente).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('ID de incidente no pertenece a la ruta');
  });

  it('should handle error when loading incident detail fails', () => {
    // Arrange
    const mockId = '123';
    const mockError = new Error('Service error');
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(mockId);
    mockIncidentService.obtenerDetalleIncidente.and.returnValue(throwError(() => mockError));
    spyOn(console, 'error');

    // Act
    component.ngOnInit();

    // Assert
    expect(mockIncidentService.obtenerDetalleIncidente).toHaveBeenCalledWith(123);
    expect(console.error).toHaveBeenCalledWith('Error al cargar el detalle del incidente', mockError);
  });

  it('should not save empty management description and show alert', () => {
    // Arrange
    component.nuevaGestion = '';
    spyOn(window, 'alert');
    
    // Act
    component.guardarGestionAIncidente();
    
    // Assert
    expect(window.alert).toHaveBeenCalledWith('Por favor, escribe una descripción de la gestión.');
    expect(component.alertaVisible).toBeFalse();
  });

  it('should not save whitespace-only management description and show alert', () => {
    // Arrange
    component.nuevaGestion = '   ';
    spyOn(window, 'alert');
    
    // Act
    component.guardarGestionAIncidente();
    
    // Assert
    expect(window.alert).toHaveBeenCalledWith('Por favor, escribe una descripción de la gestión.');
    expect(component.alertaVisible).toBeFalse();
  });

  it('should save valid management description and show alert', () => {
    // Arrange
    const testGestion = 'Nueva gestión de prueba';
    component.nuevaGestion = testGestion;
    spyOn(console, 'log');
    
    // Act
    component.guardarGestionAIncidente();
    
    // Assert
    expect(console.log).toHaveBeenCalledWith('Nueva gestión añadida:', testGestion);
    expect(component.nuevaGestion).toBe(''); // Field should be reset
    expect(component.alertaVisible).toBeTrue();
  });

  it('should auto-hide alert after timeout', fakeAsync(() => {
    // Arrange
    const testGestion = 'Nueva gestión de prueba';
    component.nuevaGestion = testGestion;
    
    // Act
    component.guardarGestionAIncidente();
    expect(component.alertaVisible).toBeTrue();
    
    // Fast-forward time
    tick(4000);
    
    // Assert
    expect(component.alertaVisible).toBeFalse();
  }));

  it('should manually hide alert when cerrarAlerta is called', () => {
    // Arrange
    component.alertaVisible = true;
    
    // Act
    component.cerrarAlerta();
    
    // Assert
    expect(component.alertaVisible).toBeFalse();
  });

  it('should load incident detail directly when cargaDetalleIncidente is called', () => {
    // Arrange
    const mockId = 123;
    const mockResponse = { 
      data: { 
        id: 123, 
        descripcion: 'Test incident' 
      } as Incident 
    };
    mockIncidentService.obtenerDetalleIncidente.and.returnValue(of(mockResponse));

    // Act
    component.cargaDetalleIncidente(mockId);

    // Assert
    expect(mockIncidentService.obtenerDetalleIncidente).toHaveBeenCalledWith(mockId);
    expect(component.detalleIncidente).toEqual(mockResponse.data);
  });
});