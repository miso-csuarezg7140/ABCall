import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ClienteDetailComponent } from './client-detail.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IncidentService } from '../../services/incident/incident.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Incident } from '../../models/incident.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

// Create mock components for header and footer
class MockHeaderComponent {}
class MockFooterComponent {}

describe('ClienteDetailComponent', () => {
    let component: ClienteDetailComponent;
    let fixture: ComponentFixture<ClienteDetailComponent>;
    let incidentServiceSpy: jasmine.SpyObj<IncidentService>;
    let alertSpy: jasmine.Spy;
    
    // Mock incident data that matches the Incident interface
    const mockIncident: Incident = {
        id: 1,
        tipoDocumentoUsuario: 'DNI',
        numDocumentoUsuario: 12345678,
        numDocumentoCliente: 87654321,
        descripcion: 'Test Incident Description',
        solucionado: false,
        solucionId: null,
        solucionadoPor: null,
        fechaSolucion: null,
        estado: 'Pendiente',
        creadoPor: 'Test User',
        fechaCreacion: '2025-05-20T10:00:00',
        modificadoPor: null,
        fechaModificacion: null
    };

    beforeEach(async () => {
        const incidentServiceMock = jasmine.createSpyObj('IncidentService', ['obtenerDetalleIncidente']);
        
        await TestBed.configureTestingModule({
            declarations: [
                ClienteDetailComponent,
                // Either declare mock components or use CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                HttpClientTestingModule, 
                FormsModule,
                RouterTestingModule // Add RouterTestingModule for routerLink
            ],
            providers: [
                { provide: IncidentService, useValue: incidentServiceMock },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => '1'
                            }
                        }
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this to allow custom elements like app-header and app-footer
        }).compileComponents();

        incidentServiceSpy = TestBed.inject(IncidentService) as jasmine.SpyObj<IncidentService>;
        alertSpy = spyOn(window, 'alert');
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ClienteDetailComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        incidentServiceSpy.obtenerDetalleIncidente.and.returnValue(of({ data: mockIncident }));
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should load incident details on init when ID is present', () => {
        incidentServiceSpy.obtenerDetalleIncidente.and.returnValue(of({ data: mockIncident }));
        
        fixture.detectChanges();
        
        expect(incidentServiceSpy.obtenerDetalleIncidente).toHaveBeenCalledWith(1);
        expect(component.detalleIncidente).toEqual(mockIncident);
    });

    it('should handle error when loading incident details', () => {
        incidentServiceSpy.obtenerDetalleIncidente.and.returnValue(throwError(() => new Error('Error')));
        spyOn(console, 'error');
        
        fixture.detectChanges();
        
        expect(console.error).toHaveBeenCalled();
        expect(component.detalleIncidente).toBeNull();
    });

    it('should not call cargaDetalleIncidente when ID is not present', () => {
        // Create a spy on the component's method BEFORE creating a new instance
        const spy = spyOn(ClienteDetailComponent.prototype, 'cargaDetalleIncidente');
        spyOn(console, 'error');
        
        // Reset and reconfigure TestBed with null ID
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            declarations: [ClienteDetailComponent],
            imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
            providers: [
                { provide: IncidentService, useValue: incidentServiceSpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => null
                            }
                        }
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        
        fixture = TestBed.createComponent(ClienteDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        
        expect(spy).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
    });

    it('should show alert when trying to save empty gestion', () => {
        component.nuevaGestion = '';
        component.guardarGestionAIncidente();
        expect(alertSpy).toHaveBeenCalledWith('Por favor, escribe una descripción de la gestión.');
    });

    it('should save gestion and show alert when valid input is provided', fakeAsync(() => {
        component.nuevaGestion = 'Test gestion';
        component.detalleIncidente = mockIncident;
        spyOn(console, 'log');
        
        component.guardarGestionAIncidente();
        
        expect(console.log).toHaveBeenCalledWith('Nueva gestión añadida:', 'Test gestion');
        expect(component.nuevaGestion).toBe('');
        expect(component.alertaVisible).toBeTrue();
        
        tick(4000);
        expect(component.alertaVisible).toBeFalse();
    }));

    it('should close alert when cerrarAlerta is called', () => {
        component.alertaVisible = true;
        component.cerrarAlerta();
        expect(component.alertaVisible).toBeFalse();
    });
});