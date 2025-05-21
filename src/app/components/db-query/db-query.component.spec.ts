import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbQueryComponent } from './db-query.component';
import { ClienteService } from '../../services/client/client.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DbQueryComponent', () => {
  let component: DbQueryComponent;
  let fixture: ComponentFixture<DbQueryComponent>;
  let clienteServiceSpy: jasmine.SpyObj<ClienteService>;
  let routerSpy: jasmine.SpyObj<Router>;

  // Datos de prueba
  const mockClientes = [
    { id: 1, tipoDocumentoUsuario: 'CC', numDocumentoUsuario: 123456789, numDocumentoCliente: 987654321, descripcion: 'Cliente 1' },
    { id: 2, tipoDocumentoUsuario: 'CE', numDocumentoUsuario: 234567890, numDocumentoCliente: 876543219, descripcion: 'Cliente 2' },
    { id: 3, tipoDocumentoUsuario: 'TI', numDocumentoUsuario: 345678901, numDocumentoCliente: 765432198, descripcion: 'Cliente especial' }
  ];

  const mockSuccessResponse = {
    statusCode: 200,
    statusDescription: 'Success',
    data: mockClientes
  };

  const mockErrorResponse = {
    statusCode: 500,
    statusDescription: 'Error interno',
    data: null
  };

  beforeEach(async () => {
    // Crear spies para los servicios
    clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['obtenerClientes']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DbQueryComponent],
      imports: [FormsModule],
      providers: [
        { provide: ClienteService, useValue: clienteServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      // Añadir estos esquemas para ignorar los componentes personalizados desconocidos
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    // Configurar el spy por defecto para devolver datos exitosos
    clienteServiceSpy.obtenerClientes.and.returnValue(of(mockSuccessResponse));

    fixture = TestBed.createComponent(DbQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call obtenerClientes on initialization', () => {
      // Verificar que el método se llama durante la inicialización
      expect(clienteServiceSpy.obtenerClientes).toHaveBeenCalled();
    });
  });

  describe('obtenerClientes', () => {
    it('should load clients successfully when API returns 200', () => {
      // Ejecutar el método explícitamente
      component.obtenerClientes();

      // Verificar que el servicio fue llamado
      expect(clienteServiceSpy.obtenerClientes).toHaveBeenCalled();
      
      // Verificar que los datos fueron asignados correctamente
      expect(component.clientes).toEqual(mockClientes);
      expect(component.clientesFiltrados).toEqual(mockClientes);
    });

    it('should handle API error status codes', () => {
      // Configurar el spy para devolver un error de API
      clienteServiceSpy.obtenerClientes.and.returnValue(of(mockErrorResponse));
      
      // Espiar console.error
      spyOn(console, 'error');
      
      // Ejecutar el método
      component.obtenerClientes();
      
      // Verificar que se manejó correctamente el error
      expect(console.error).toHaveBeenCalledWith('Error al obtener clientes:', mockErrorResponse.statusDescription);
    });

    it('should handle HTTP errors', () => {
      // Configurar el spy para lanzar un error HTTP
      const errorMsg = 'Error de conexión';
      clienteServiceSpy.obtenerClientes.and.returnValue(throwError(() => new Error(errorMsg)));
      
      // Espiar console.error
      spyOn(console, 'error');
      
      // Ejecutar el método
      component.obtenerClientes();
      
      // Verificar que se manejó correctamente el error
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('aplicarBusqueda', () => {
    beforeEach(() => {
      // Configurar datos iniciales para todas las pruebas de búsqueda
      component.clientes = mockClientes;
      component.clientesFiltrados = [...mockClientes];
    });

    it('should return all clients when search term is empty', () => {
      // Configurar término de búsqueda vacío
      component.terminoBusqueda = '';
      
      // Ejecutar el método
      component.aplicarBusqueda();
      
      // Verificar que se devuelven todos los clientes
      expect(component.clientesFiltrados.length).toBe(mockClientes.length);
      expect(component.clientesFiltrados).toEqual(mockClientes);
    });

    it('should filter clients based on search term', () => {
      // Configurar término de búsqueda que debería encontrar un cliente
      component.terminoBusqueda = 'especial';
      
      // Ejecutar el método
      component.aplicarBusqueda();
      
      // Verificar que se filtran correctamente los clientes
      expect(component.clientesFiltrados.length).toBe(1);
      expect(component.clientesFiltrados[0].descripcion).toContain('especial');
    });

    it('should filter clients case-insensitively', () => {
      // Configurar término de búsqueda con diferente caso
      component.terminoBusqueda = 'CLIENTE';
      
      // Ejecutar el método
      component.aplicarBusqueda();
      
      // Verificar que se filtran correctamente los clientes, ignorando mayúsculas/minúsculas
      expect(component.clientesFiltrados.length).toBe(3);
    });

    it('should return empty array when no clients match the search term', () => {
      // Configurar término de búsqueda que no coincide con ningún cliente
      component.terminoBusqueda = 'noexiste';
      
      // Ejecutar el método
      component.aplicarBusqueda();
      
      // Verificar que se devuelve un array vacío
      expect(component.clientesFiltrados.length).toBe(0);
    });
  });

  describe('irADetalle', () => {
    it('should navigate to client detail page with correct ID', () => {
      // ID de cliente para la prueba
      const clienteId = '123';
      
      // Llamar al método
      component.irADetalle(clienteId);
      
      // Verificar que se navega a la ruta correcta con el ID proporcionado
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/incidents/detail', clienteId]);
    });
  });
});