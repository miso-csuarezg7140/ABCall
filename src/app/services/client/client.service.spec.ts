import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteService } from './client.service';
import { environment } from '../../../environments/environment';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/abcall/clientes/v1`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService]
    });
    
    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('obtenerClientes', () => {
    it('should return an Observable of clients', () => {
      const mockResponse = {
        statusCode: 200,
        statusDescription: 'Success',
        data: [
          {
            tipoDocumentoUsuario: 'CC',
            numDocumentoUsuario: 123456789,
            numDocumentoCliente: 987654321,
            descripcion: 'Cliente corporativo'
          },
          {
            tipoDocumentoUsuario: 'CE',
            numDocumentoUsuario: 234567890,
            numDocumentoCliente: 876543219,
            descripcion: 'Cliente extranjero'
          }
        ]
      };

      service.obtenerClientes().subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.data.length).toBe(2);
        expect(response.statusCode).toBe(200);
      });

      const req = httpMock.expectOne(`${apiUrl}/listar`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors when fetching clients fails', () => {
      const mockError = {
        status: 500,
        statusText: 'Internal Server Error'
      };

      service.obtenerClientes().subscribe(
        () => fail('should have failed with a 500 error'),
        (error) => {
          expect(error.status).toBe(500);
        }
      );

      const req = httpMock.expectOne(`${apiUrl}/listar`);
      expect(req.request.method).toBe('GET');
      req.flush('Error interno del servidor', mockError);
    });

    it('should handle empty response', () => {
      const mockEmptyResponse = {
        statusCode: 204,
        statusDescription: 'No Content',
        data: []
      };

      service.obtenerClientes().subscribe(response => {
        expect(response).toEqual(mockEmptyResponse);
        expect(response.data.length).toBe(0);
      });

      const req = httpMock.expectOne(`${apiUrl}/listar`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmptyResponse);
    });

    it('should use the correct API URL from environment', () => {
      service.obtenerClientes().subscribe();

      const req = httpMock.expectOne(`${apiUrl}/listar`);
      expect(req.request.url).toBe(`${apiUrl}/listar`);
      req.flush({});
    });
  });
});