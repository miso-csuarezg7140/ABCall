/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { RegisterService } from './register-client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Register } from '../../interfaces/register';
import { ResponseRegister } from '../../interfaces/response-register';
import { HttpErrorResponse } from '@angular/common/http';

describe('Service: RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;
  
  // Eliminamos el beforeAll con el spyOn problemático
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call POST on registerClient and return expected response', () => {
    const mockRegister: Register = {
      numeroDocumento: '123456789',
      razonSocial: 'Empresa Ejemplo',
      correo: 'ejemplo@correo.com',
      contrasena: 'Contraseña123'
    };

    const mockResponse: ResponseRegister = {
      statusCode: 200,
      statusDescription: 'OK',
      data: [mockRegister]
    };

    service.registerClient(mockRegister).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/abcall/clientes/v1/registrar`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRegister);
    req.flush(mockResponse);
  });

  it('should handle error when the API returns an error response', () => {
    const mockRegister: Register = {
      numeroDocumento: '123456789',
      razonSocial: 'Empresa Ejemplo',
      correo: 'ejemplo@correo.com',
      contrasena: 'Contraseña123'
    };

    const mockError = { status: 400, statusText: 'Bad Request' };

    service.registerClient(mockRegister).subscribe({
      next: () => fail('should have failed with the 400 error'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/abcall/clientes/v1/registrar`);
    expect(req.request.method).toBe('POST');
    req.flush('Invalid request', mockError);
  });

  it('should handle network errors', () => {
    const mockRegister: Register = {
      numeroDocumento: '123456789',
      razonSocial: 'Empresa Ejemplo',
      correo: 'ejemplo@correo.com',
      contrasena: 'Contraseña123'
    };

    service.registerClient(mockRegister).subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error) => {
        // En errores HTTP de red, Angular devuelve un HttpErrorResponse
        expect(error instanceof HttpErrorResponse).toBeTruthy();
        expect(error.status).toBe(0);
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/abcall/clientes/v1/registrar`);
    expect(req.request.method).toBe('POST');
    req.error(new ProgressEvent('error'));
  });
  
  it('should use the correct API endpoint', () => {
    expect(environment.apiUrl).toBeDefined();
  });
});