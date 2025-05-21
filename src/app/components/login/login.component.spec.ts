import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementRef } from '@angular/core';
import { ResponseLoginAgent } from '../../interfaces/response-login-agent';
import { ResponseLoginClient } from '../../interfaces/response-login-client';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Mock bootstrap Modal class
class MockModal {
  show() { }
  hide() { }
}

// Mock global bootstrap object
const mockBootstrap = {
  Modal: class {
    constructor() { }
    show() { }
    static getInstance() { return new MockModal(); }
  }
};

// Assign mockBootstrap to window.bootstrap
(window as any).bootstrap = mockBootstrap;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    // Create spies for the dependencies
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['loginAgente', 'loginCliente', 'guardarDatosAgente']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.tipoUsuario).toBe('cliente');
    expect(component.tipoDocumento).toBe('');
    expect(component.numeroDocumento).toBe('');
    expect(component.contrasena).toBe('');
  });

  describe('onLogin', () => {
    it('should call loginAgente when tipo usuario is agente', () => {
      // Arrange
      component.tipoUsuario = 'agente';
      component.tipoDocumento = '1';
      component.numeroDocumento = '123456789';
      component.contrasena = 'password123';
      
      const mockResponse: ResponseLoginAgent = {
        statusCode: 200,
        statusDescription: 'Success',
        data: { 
          token: 'jwt-token',
          type: 'Bearer',
          refreshToken: 'refresh-token',
          expiresIn: 3600,
          roles: ['AGENT'],
          userType: 'AGENT',
          documentNumber: '123456789',
          documentType: 1,
          names: 'Test Agent',
          surnames: 'Test Last Name'
        }
      };
      
      loginService.loginAgente.and.returnValue(of(mockResponse));
      
      // Act
      component.onLogin();
      
      // Assert
      expect(loginService.loginAgente).toHaveBeenCalledWith({
        tipoDocumento: '1',
        numeroDocumento: '123456789',
        contrasena: 'password123'
      });
      expect(router.navigate).toHaveBeenCalledWith(['/incidents']);
      expect(localStorage.getItem('documento')).toBe('123456789');
    });

    it('should show error snackbar when agente login fails', () => {
      // Arrange
      component.tipoUsuario = 'agente';
      component.tipoDocumento = '1';
      component.numeroDocumento = '123456789';
      component.contrasena = 'password123';
      
      loginService.loginAgente.and.returnValue(throwError(() => new Error('Error')));
      
      // Act
      component.onLogin();
      
      // Assert
      expect(loginService.loginAgente).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalledWith(
        'Error al iniciar sesión como agente.', 
        'Cerrar', 
        { duration: 3000 }
      );
    });
    
    it('should call loginCliente when tipo usuario is cliente', () => {
      // Arrange
      component.tipoUsuario = 'cliente';
      component.numeroDocumento = '123456789';
      component.contrasena = 'password123';
      
      const mockResponse: ResponseLoginClient = {
        statusCode: 200,
        statusDescription: 'Success',
        data: { 
          token: 'jwt-token',
          type: 'Bearer',
          refreshToken: 'refresh-token',
          expiresIn: 3600,
          roles: ['CLIENT'],
          userType: 'CLIENT',
          clientId: 123,
          documentNumber: '123456789',
          socialReason: 'Test Company',
          email: 'test@example.com'
        }
      };
      
      loginService.loginCliente.and.returnValue(of(mockResponse));
      
      // Create a mock element for modal reference
      const mockModalElement = document.createElement('div');
      
      // Mock getElementById call
      spyOn(document, 'getElementById').and.returnValue(mockModalElement);
      
      // Create mock modal instance
      const mockModalInstance = { show: jasmine.createSpy('show') };
      spyOn(window.bootstrap.Modal, 'getInstance').and.returnValue(null);
      spyOn(window.bootstrap, 'Modal').and.returnValue(mockModalInstance);
      
      // Act
      component.onLogin();
      
      // Assert
      expect(loginService.loginCliente).toHaveBeenCalledWith({
        numeroDocumento: '123456789',
        contrasena: 'password123'
      });
      expect(mockModalInstance.show).toHaveBeenCalled();
    });
    
    it('should show error snackbar when cliente login fails', () => {
      // Arrange
      component.tipoUsuario = 'cliente';
      component.numeroDocumento = '123456789';
      component.contrasena = 'password123';
      
      loginService.loginCliente.and.returnValue(throwError(() => new Error('Error')));
      
      // Act
      component.onLogin();
      
      // Assert
      expect(loginService.loginCliente).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalledWith(
        'Error al iniciar sesión como cliente.', 
        'Cerrar', 
        { duration: 3000 }
      );
    });
  });

  describe('UI behavior', () => {
    it('should show tipoDocumento field only when tipoUsuario is "agente"', () => {
      // Arrange
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      
      // Act - With cliente selected
      component.tipoUsuario = 'cliente';
      fixture.detectChanges();
      
      // Assert
      let tipoDocumentoField = compiled.querySelector('#tipoDocumento');
      expect(tipoDocumentoField).toBeNull();
      
      // Act - With agente selected
      component.tipoUsuario = 'agente';
      fixture.detectChanges();
      
      // Assert
      tipoDocumentoField = compiled.querySelector('#tipoDocumento');
      expect(tipoDocumentoField).not.toBeNull();
    });
  });
});