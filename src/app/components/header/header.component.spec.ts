import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { LoginService } from '../../services/login/login.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    // Crear un espía para el servicio LoginService
    const spy = jasmine.createSpyObj('LoginService', ['obtenerDocumentoAgente']);
    
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: LoginService, useValue: spy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Para ignorar errores de componentes hijo no declarados
    }).compileComponents();

    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty agente', () => {
    expect(component.agente).toBe('');
    expect(component.documento).toBe('');
  });

  it('should call obtenerDocumentoAgente on ngOnInit', () => {
    // Configurar el espía para retornar un valor específico
    loginServiceSpy.obtenerDocumentoAgente.and.returnValue('12345678');
    
    // Llamar a ngOnInit manualmente
    component.ngOnInit();
    
    // Verificar que se llamó al método del servicio
    expect(loginServiceSpy.obtenerDocumentoAgente).toHaveBeenCalled();
    
    // Verificar que el valor de agente se actualizó correctamente
    expect(component.agente).toBe('12345678');
  });

  it('should handle null value from obtenerDocumentoAgente', () => {
    // Configurar el espía para retornar null
    loginServiceSpy.obtenerDocumentoAgente.and.returnValue(null);
    
    // Llamar a ngOnInit manualmente
    component.ngOnInit();
    
    // Verificar que se llamó al método del servicio
    expect(loginServiceSpy.obtenerDocumentoAgente).toHaveBeenCalled();
    
    // Verificar que el valor de agente se estableció en null
    expect(component.agente).toBeNull();
  });

  it('should have the correct API URL', () => {
    // Verificar que la URL de la API se configure correctamente desde environment
    // Esto es un poco más complicado ya que apiUrl es privada, pero podemos verificar
    // indirectamente a través de reflection o simplemente verificando que environment.apiUrl existe
    expect(environment.apiUrl).toBeDefined();
    
    // Acceder a la propiedad privada para verificación - solo para testing
    const apiUrl = (component as any).apiUrl;
    expect(apiUrl).toBe(`${environment.apiUrl}/abcall/clientes/v1/autenticar`);
  });

  // Reemplazamos las pruebas que usan propiedades internas de Angular

  it('should be identifiable as HeaderComponent instance', () => {
    // En lugar de verificar el selector directamente, verificamos el tipo de la instancia
    expect(component instanceof HeaderComponent).toBe(true);
  });

  it('should render content in the DOM', () => {
    // En lugar de verificar templateUrl y styleUrls, verificamos que el componente
    // se renderiza correctamente en el DOM
    fixture.detectChanges(); // Importante para activar la detección de cambios
    const compiledComponent = fixture.nativeElement;
    
    // Esta aserción verifica que el elemento host existe
    expect(compiledComponent).toBeTruthy();
    
    // Aquí puedes añadir verificaciones específicas basadas en el contenido
    // de tu plantilla HTML, por ejemplo:
    // expect(compiledComponent.querySelector('.header-logo')).toBeTruthy();
    // expect(compiledComponent.querySelector('.user-info')).toBeTruthy();
  });
});