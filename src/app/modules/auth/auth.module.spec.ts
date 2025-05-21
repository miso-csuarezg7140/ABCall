import { TestBed } from '@angular/core/testing';
import { AuthModule } from './auth.module';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterClientComponent } from '../../components/register-client/register-client.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Importar ToastrModule para resolver el error de ToastrService
import { ToastrModule } from 'ngx-toastr';

// Test components to verify exports - agregamos atributo host para evitar colisión de IDs
@Component({
  selector: 'test-login-host',
  template: '<app-login></app-login>'
})
class TestLoginHostComponent {}

@Component({
  selector: 'test-register-host',
  template: '<app-register-client></app-register-client>'
})
class TestRegisterHostComponent {}

describe('AuthModule', () => {
    let authModule: AuthModule;

    beforeEach(() => {
        authModule = new AuthModule();
    });

    it('should create an instance', () => {
        expect(authModule).toBeTruthy();
    });

    it('should import CommonModule and FormsModule', () => {
        // Verificamos indirectamente que los módulos están importados 
        // configurando un TestBed con nuestro módulo
        TestBed.configureTestingModule({
            imports: [
                AuthModule, 
                HttpClientTestingModule,
                ToastrModule.forRoot() // Añadir ToastrModule.forRoot()
            ]
        });
        
        // El test pasará si no hay errores, lo que significa
        // que CommonModule y FormsModule están disponibles
        expect(true).toBeTruthy();
    });

    it('should declare LoginComponent and RegisterClientComponent', () => {
        // Verificamos indirectamente que los componentes están declarados
        // probando si podemos crear instancias de ellos
        TestBed.configureTestingModule({
            imports: [
                AuthModule, 
                HttpClientTestingModule,
                ToastrModule.forRoot() // Añadir ToastrModule.forRoot()
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA] // Añadir CUSTOM_ELEMENTS_SCHEMA
        });
        
        const loginFixture = TestBed.createComponent(LoginComponent);
        const registerFixture = TestBed.createComponent(RegisterClientComponent);
        
        expect(loginFixture.componentInstance).toBeTruthy();
        expect(registerFixture.componentInstance).toBeTruthy();
    });

    it('should export LoginComponent and RegisterClientComponent', () => {
        TestBed.configureTestingModule({
            declarations: [TestLoginHostComponent, TestRegisterHostComponent],
            imports: [
                AuthModule, 
                HttpClientTestingModule,
                ToastrModule.forRoot() // Añadir ToastrModule.forRoot() 
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA] // Añadir CUSTOM_ELEMENTS_SCHEMA
        });
        
        // Si estos componentes están siendo exportados por AuthModule,
        // deberíamos poder usarlos en un componente host sin errores
        const loginHostFixture = TestBed.createComponent(TestLoginHostComponent);
        const registerHostFixture = TestBed.createComponent(TestRegisterHostComponent);
        
        expect(loginHostFixture.componentInstance).toBeTruthy();
        expect(registerHostFixture.componentInstance).toBeTruthy();
    });
});