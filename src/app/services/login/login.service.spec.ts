import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { environment } from '../../../environments/environment';
import { LoginClient } from '../../interfaces/login-client';
import { LoginAgent } from '../../interfaces/login-agent';
import { ResponseLoginClient } from '../../interfaces/response-login-client';
import { ResponseLoginAgent } from '../../interfaces/response-login-agent';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.apiUrl}/abcall`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
    localStorage.clear(); // Limpia el localStorage después de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loginCliente', () => {
    it('should send a POST request to authenticate a client', () => {
      const mockLoginData: LoginClient = {
        numeroDocumento: '123456789',
        contrasena: 'password123'
      };

      const mockResponse: ResponseLoginClient = {
        statusCode: 200,
        statusDescription: 'Success',
        data: {
          token: 'mock-token',
          type: 'Bearer',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600,
          roles: ['CLIENT'],
          userType: 'CLIENT',
          clientId: 1,
          documentNumber: '123456789',
          socialReason: 'Test Cliente',
          email: 'cliente@test.com'
        }
      };

      service.loginCliente(mockLoginData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/clientes/v1/autenticar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockLoginData);
      req.flush(mockResponse);
    });

    it('should handle error when client authentication fails', () => {
      const mockLoginData: LoginClient = {
        numeroDocumento: '123456789',
        contrasena: 'wrongpassword'
      };

      const mockError = {
        statusCode: 401,
        statusDescription: 'Unauthorized',
        message: 'Credenciales inválidas'
      };

      service.loginCliente(mockLoginData).subscribe(
        () => fail('should have failed with an error'),
        (error) => {
          expect(error.status).toBe(401);
        }
      );

      const req = httpMock.expectOne(`${baseUrl}/clientes/v1/autenticar`);
      expect(req.request.method).toBe('POST');
      req.flush(mockError, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('loginAgente', () => {
    it('should send a POST request to authenticate an agent', () => {
      const mockLoginData: LoginAgent = {
        tipoDocumento: 'CC',
        numeroDocumento: '123456789',
        contrasena: 'password123'
      };

      const mockResponse: ResponseLoginAgent = {
        statusCode: 200,
        statusDescription: 'Success',
        data: {
          token: 'mock-token',
          type: 'Bearer',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600,
          roles: ['AGENT'],
          userType: 'AGENT',
          documentNumber: '123456789',
          documentType: 1, // Asumiendo que 1 corresponde a 'CC'
          names: 'Test',
          surnames: 'Agente'
        }
      };

      service.loginAgente(mockLoginData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/agentes/v1/autenticar`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockLoginData);
      req.flush(mockResponse);
    });

    it('should handle error when agent authentication fails', () => {
      const mockLoginData: LoginAgent = {
        tipoDocumento: 'CC',
        numeroDocumento: '123456789',
        contrasena: 'wrongpassword'
      };

      service.loginAgente(mockLoginData).subscribe(
        () => fail('should have failed with an error'),
        (error) => {
          expect(error.status).toBe(401);
        }
      );

      const req = httpMock.expectOne(`${baseUrl}/agentes/v1/autenticar`);
      expect(req.request.method).toBe('POST');
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('guardarDatosAgente', () => {
    it('should store agent data in localStorage', () => {
      // Arrange
      const tipoDocumento = 'CC';
      const numeroDocumento = '123456789';
      
      // Act
      service.guardarDatosAgente(tipoDocumento, numeroDocumento);
      
      // Assert
      expect(localStorage.getItem('tipoDocumento')).toBe(tipoDocumento);
      expect(localStorage.getItem('numeroDocumento')).toBe(numeroDocumento);
    });
  });

  describe('obtenerDocumentoAgente', () => {
    it('should retrieve agent document from localStorage', () => {
      // Arrange
      const documento = '123456789';
      localStorage.setItem('documento', documento);
      
      // Act
      const result = service.obtenerDocumentoAgente();
      
      // Assert
      expect(result).toBe(documento);
    });

    it('should return null when document is not in localStorage', () => {
      // Ensure localStorage is empty
      localStorage.removeItem('documento');
      
      // Act
      const result = service.obtenerDocumentoAgente();
      
      // Assert
      expect(result).toBeNull();
    });
  });
});