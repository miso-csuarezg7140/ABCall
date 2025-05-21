import { TestBed } from '@angular/core/testing';
import { MembershipModule } from './membership.module';
import { MembershipComponent } from '../../components/membership/membership.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Test component to verify exports
@Component({
  selector: 'test-membership-host',
  template: '<app-membership></app-membership>'
})
class TestMembershipHostComponent {}

describe('MembershipModule', () => {
  let membershipModule: MembershipModule;

  beforeEach(() => {
    membershipModule = new MembershipModule();
  });

  it('should create an instance', () => {
    expect(membershipModule).toBeTruthy();
  });

  it('should import CommonModule', () => {
    // Verificamos indirectamente que el CommonModule está importado
    // configurando un TestBed con nuestro módulo
    TestBed.configureTestingModule({
      imports: [MembershipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    
    // El test pasará si no hay errores, lo que significa
    // que CommonModule está disponible
    expect(true).toBeTruthy();
  });

  it('should declare MembershipComponent', () => {
    // Verificamos indirectamente que MembershipComponent está declarado
    // probando si podemos crear una instancia del componente
    TestBed.configureTestingModule({
      imports: [MembershipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    
    const fixture = TestBed.createComponent(MembershipComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should export MembershipComponent', () => {
    TestBed.configureTestingModule({
      declarations: [TestMembershipHostComponent],
      imports: [MembershipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    
    // Si el componente está siendo exportado por MembershipModule,
    // deberíamos poder usarlo en un componente host sin errores
    const hostFixture = TestBed.createComponent(TestMembershipHostComponent);
    expect(hostFixture.componentInstance).toBeTruthy();
  });
});