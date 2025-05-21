import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RegistroIncidenteComponent } from './register-incident.component';
import { IncidentService } from '../../services/incident/incident.service';
import { of, throwError } from 'rxjs';

describe('RegistroIncidenteComponent', () => {
  let component: RegistroIncidenteComponent;
  let fixture: ComponentFixture<RegistroIncidenteComponent>;
  let incidentServiceMock: jasmine.SpyObj<IncidentService>;

  beforeEach(async () => {
    // Create a mock for the IncidentService
    incidentServiceMock = jasmine.createSpyObj('IncidentService', ['crearIncidente']);
    
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Need FormsModule for ngModel binding
      declarations: [RegistroIncidenteComponent],
      providers: [
        { provide: IncidentService, useValue: incidentServiceMock }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(RegistroIncidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty incident form', () => {
    expect(component.incidente).toBeDefined();
    expect(component.incidente.tipoDocumentoUsuario).toBe('');
    expect(component.incidente.numDocumentoUsuario).toBeNull();
    expect(component.incidente.numDocumentoCliente).toBeNull();
    expect(component.incidente.descripcion).toBe('');
  });

  describe('crearIncidente', () => {
    beforeEach(() => {
      // Setup test incident data before each test
      component.incidente = {
        tipoDocumentoUsuario: 'CC',
        numDocumentoUsuario: 12345678,
        numDocumentoCliente: 87654321,
        descripcion: 'Test incident description'
      };
    });

    it('should call incidentService.crearIncidente with the correct data', () => {
      // Setup service to return success
      incidentServiceMock.crearIncidente.and.returnValue(of({ success: true }));
      
      // Call the method
      component.crearIncidente();
      
      // Verify service was called with correct data
      expect(incidentServiceMock.crearIncidente).toHaveBeenCalledWith({
        tipoDocumentoUsuario: 'CC',
        numDocumentoUsuario: 12345678,
        numDocumentoCliente: 87654321,
        descripcion: 'Test incident description'
      });
    });

    it('should show success alert and reset form on successful creation', () => {
      // Setup service response
      incidentServiceMock.crearIncidente.and.returnValue(of({ success: true }));
      
      // Spy on window.alert
      spyOn(window, 'alert');
      
      // Call the method
      component.crearIncidente();
      
      // Verify alert was shown
      expect(window.alert).toHaveBeenCalledWith('Incidente registrado exitosamente');
      
      // Verify form was reset
      expect(component.incidente).toEqual({
        tipoDocumentoUsuario: '',
        numDocumentoUsuario: null,
        numDocumentoCliente: null,
        descripcion: ''
      });
    });

    it('should show error alert when incident creation fails', () => {
      // Setup service to throw error
      const testError = new Error('Test error');
      incidentServiceMock.crearIncidente.and.returnValue(throwError(() => testError));
      
      // Spy on window.alert and console.error
      spyOn(window, 'alert');
      spyOn(console, 'error');
      
      // Call the method
      component.crearIncidente();
      
      // Verify error was handled correctly
      expect(window.alert).toHaveBeenCalledWith('Error al registrar el incidente');
      expect(console.error).toHaveBeenCalledWith(testError);
      
      // Form should not be reset on error
      expect(component.incidente).toEqual({
        tipoDocumentoUsuario: 'CC',
        numDocumentoUsuario: 12345678,
        numDocumentoCliente: 87654321,
        descripcion: 'Test incident description'
      });
    });
    
    it('should handle different error types correctly', () => {
      // Setup service to throw an object error (like an HTTP error response)
      const httpError = { 
        status: 400, 
        error: { message: 'Bad Request' } 
      };
      incidentServiceMock.crearIncidente.and.returnValue(throwError(() => httpError));
      
      // Spy on window.alert and console.error
      spyOn(window, 'alert');
      spyOn(console, 'error');
      
      // Call the method
      component.crearIncidente();
      
      // Verify error handling
      expect(window.alert).toHaveBeenCalledWith('Error al registrar el incidente');
      expect(console.error).toHaveBeenCalledWith(httpError);
    });
  });
});