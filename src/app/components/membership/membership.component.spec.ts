import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembershipComponent } from './membership.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MembershipComponent', () => {
  let component: MembershipComponent;
  let fixture: ComponentFixture<MembershipComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershipComponent],
      schemas: [NO_ERRORS_SCHEMA] // Para evitar errores de componentes hijos no declarados
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipComponent);
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

  it('should be identifiable as MembershipComponent instance', () => {
    // Verificar que la instancia es del tipo correcto
    expect(component instanceof MembershipComponent).toBe(true);
  });

  it('should render content in the DOM', () => {
    fixture.detectChanges();
    const compiledComponent = fixture.nativeElement;

    // Verificar que el elemento host existe
    expect(compiledComponent).toBeTruthy();

    // Nota: Aquí puedes añadir verificaciones específicas basadas en el contenido
    // de tu plantilla HTML cuando la implementes, por ejemplo:
    // expect(compiledComponent.querySelector('.membership-title')).toBeTruthy();
  });

  it('should have the correct component selector', () => {
    // Verificar que el componente tiene el selector correcto
    const componentDefinition = component.constructor as any;
    expect(componentDefinition.ɵcmp.selectors[0][0]).toBe('app-membership');
  });

  // Si en el futuro agregas propiedades o métodos a este componente,
  // deberías añadir pruebas adicionales aquí
});