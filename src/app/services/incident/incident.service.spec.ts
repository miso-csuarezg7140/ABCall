import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IncidentService } from './incident.service';
import { environment } from '../../../environments/environment';

describe('IncidentService', () => {
  let service: IncidentService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/abcall/incidentes/v1`;

  beforeEach(() => {
    // Configurar un token mock en localStorage para las pruebas
    const mockToken = 'mock-jwt-token';
    localStorage.setItem('token', mockToken);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IncidentService]
    });
    
    service = TestBed.inject(IncidentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no hay solicitudes pendientes
    localStorage.clear(); // Limpiar localStorage después de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('crearIncidente', () => {
    it('should send a POST request to create an incident', () => {
      const mockIncidente = {
        tipoDocumentoUsuario: 'CC',
        numDocumentoUsuario: 123456789,
        numDocumentoCliente: 987654321,
        descripcion: 'Prueba de incidente'
      };

      const mockResponse = {
        statusCode: 201,
        statusDescription: 'Created',
        data: { id: 1, ...mockIncidente }
      };

      service.crearIncidente(mockIncidente).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/crear`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockIncidente);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Authorization')).toBe('Bearer mock-jwt-token');
      req.flush(mockResponse);
    });

    it('should handle error when creating an incident', () => {
      const mockIncidente = {
        tipoDocumentoUsuario: 'CC',
        numDocumentoUsuario: 123456789,
        numDocumentoCliente: 987654321,
        descripcion: 'Prueba de incidente con error'
      };

      service.crearIncidente(mockIncidente).subscribe(
        () => fail('should have failed with an error'),
        (error) => {
          expect(error.status).toBe(400);
        }
      );

      const req = httpMock.expectOne(`${apiUrl}/crear`);
      expect(req.request.method).toBe('POST');
      req.flush('Error de validación', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('obtenerResumen', () => {
    it('should send a GET request to get a summary', () => {
      const mockResponse = {
        statusCode: 200,
        statusDescription: 'Success',
        data: {
          totalIncidentes: 10,
          incidentesAbiertos: 5,
          incidentesCerrados: 5
        }
      };

      service.obtenerResumen().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/resumen`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer mock-jwt-token');
      req.flush(mockResponse);
    });
  });

  describe('consultarIncidentesFiltrados', () => {
    it('should send a POST request with default values for empty filter', () => {
      const emptyFilter = {};
      const expectedBody = {
        pagina: 1,
        tamanioPagina: 5,
        descargar: false,
      };

      service.consultarIncidentesFiltrados(emptyFilter).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/consultar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(expectedBody);
      req.flush({ statusCode: 200, data: { data: [] } });
    });

    it('should merge filter values with defaults and remove empty values', () => {
      const filter = {
        tipoDocUsuario: 'CC',
        numeroDocUsuario: '123456789',
        estado: '',  // Debería ser eliminado
        fechaInicio: null, // Debería ser eliminado
        pagina: 2
      };

      const expectedBody = {
        tipoDocUsuario: 'CC',
        numeroDocUsuario: '123456789',
        pagina: 2,
        tamanioPagina: 5,
        descargar: false,
      };

      service.consultarIncidentesFiltrados(filter).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/consultar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(expectedBody);
      req.flush({ statusCode: 200, data: { data: [] } });
    });

    it('should remove invalid dates from filter', () => {
      const filter = {
        fechaInicio: 'not-a-date',
        fechaFin: '2023-01-01',
      };

      const expectedBody = {
        fechaFin: '2023-01-01',
        pagina: 1,
        tamanioPagina: 5,
        descargar: false,
      };

      service.consultarIncidentesFiltrados(filter).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/consultar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(expectedBody);
      req.flush({ statusCode: 200, data: { data: [] } });
    });

    it('should handle successful response with data', () => {
      const mockResponse = {
        statusCode: 200,
        statusDescription: 'Success',
        data: {
          data: [
            { id: 1, descripcion: 'Incidente 1' },
            { id: 2, descripcion: 'Incidente 2' }
          ],
          paginacion: {
            pagina: 1,
            tamanioPagina: 5,
            totalRegistros: 2,
            totalPaginas: 1
          }
        }
      };

      service.consultarIncidentesFiltrados({ pagina: 1 }).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.data.data.length).toBe(2);
      });

      const req = httpMock.expectOne(`${apiUrl}/consultar`);
      req.flush(mockResponse);
    });
  });

  describe('obtenerIncidentes', () => {
    it('should send a POST request with the given filter', () => {
      const filter = { estado: 'ACTIVO', pagina: 1 };

      service.obtenerIncidentes(filter).subscribe();

      const req = httpMock.expectOne(`${apiUrl}/consultar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(filter);
      req.flush({ statusCode: 200, data: { data: [] } });
    });
  });

  describe('obtenerDetalleIncidente', () => {
    it('should send a GET request with the incident ID', () => {
      const incidentId = 123;
      const mockResponse = {
        statusCode: 200,
        statusDescription: 'Success',
        data: {
          id: incidentId,
          descripcion: 'Detalles del incidente',
          estado: 'ACTIVO'
        }
      };

      service.obtenerDetalleIncidente(incidentId).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.data.id).toBe(incidentId);
      });

      const req = httpMock.expectOne(`${apiUrl}/consultarDetalle?idIncidente=${incidentId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error when fetching incident details', () => {
      const incidentId = 999;

      service.obtenerDetalleIncidente(incidentId).subscribe(
        () => fail('should have failed with an error'),
        (error) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`${apiUrl}/consultarDetalle?idIncidente=${incidentId}`);
      req.flush('Incidente no encontrado', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('obtenerTodosLosClientes', () => {
    it('should send a GET request to fetch all clients', () => {
      const mockResponse = {
        statusCode: 200,
        statusDescription: 'Success',
        data: [
          { id: 1, nombre: 'Cliente 1' },
          { id: 2, nombre: 'Cliente 2' }
        ]
      };

      service.obtenerTodosLosClientes().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.data.length).toBe(2);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/clientes/v1/listar`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});