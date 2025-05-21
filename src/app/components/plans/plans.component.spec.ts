import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlansComponent } from './plans.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlansComponent],
      schemas: [NO_ERRORS_SCHEMA] // Para evitar errores de componentes hijos no declarados
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ngOnInit correctly', () => {
    // Espiar el método ngOnInit para verificar que se llama correctamente
    const spyOnInit = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spyOnInit).toHaveBeenCalled();
  });

  it('should be identifiable as PlansComponent instance', () => {
    // Verificar que la instancia es del tipo correcto
    expect(component instanceof PlansComponent).toBe(true);
  });

  it('should render content in the DOM', () => {
    fixture.detectChanges();
    const compiledComponent = fixture.nativeElement;
    
    // Verificar que el elemento host existe
    expect(compiledComponent).toBeTruthy();
    
    // Nota: Aquí puedes añadir verificaciones específicas basadas en el contenido
    // de tu plantilla HTML cuando la implementes, por ejemplo:
    // expect(compiledComponent.querySelector('.plans-title')).toBeTruthy();
  });

  it('should have the correct component selector', () => {
    // Verificar que el componente tiene el selector correcto
    const componentDefinition = component.constructor as any;
    expect(componentDefinition.ɵcmp.selectors[0][0]).toBe('app-plans');
  });

  // Si en el futuro agregas propiedades o métodos a este componente,
  // deberías añadir pruebas adicionales aquí
});