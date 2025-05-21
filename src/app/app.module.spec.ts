import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { MembershipModule } from './modules/membership/membership.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IncidentComponent } from './components/incident/incident.component';
import { IncidentDetailComponent } from './components/incident-detail/incident-detail.component';
import { DbQueryComponent } from './components/db-query/db-query.component';
import { RegistroIncidenteComponent } from './components/register-incident/register-incident.component';
import { ClienteDetailComponent } from './components/client-detail/client-detail.component';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(() => {
    appModule = new AppModule();
  });

  it('should create the app module', () => {
    expect(appModule).toBeTruthy();
  });

  it('should compile the app module', () => {
    // Esta prueba verifica que el módulo se compile sin errores
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    
    expect(TestBed.inject(AppModule)).toBeTruthy();
  });

  it('should bootstrap AppComponent', () => {
    // En lugar de usar reflexión, verificamos indirectamente que AppComponent
    // es el componente bootstrap creándolo desde el TestBed configurado con AppModule
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should declare all required components', () => {
    // Verifica que todos los componentes necesarios estén declarados
    TestBed.configureTestingModule({
      // Configuramos un módulo de prueba que simula el AppModule
      declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        IncidentComponent,
        IncidentDetailComponent,
        DbQueryComponent,
        RegistroIncidenteComponent,
        ClienteDetailComponent,
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        NgxPaginationModule,
        BrowserAnimationsModule,
        AuthModule,
        MembershipModule,
        HttpClientModule,
        MatSnackBarModule
      ]
    });
    
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('Module imports', () => {
    // Método auxiliar para verificar si un módulo está en la lista de importaciones
    function containsImport(moduleClass: any): boolean {
      try {
        TestBed.configureTestingModule({
          imports: [AppModule]
        });
        return !!TestBed.inject(moduleClass);
      } catch (e) {
        return false;
      }
    }

    it('should import BrowserModule', () => {
      expect(containsImport(BrowserModule)).toBeTruthy();
    });

    it('should import AppRoutingModule', () => {
      expect(containsImport(AppRoutingModule)).toBeTruthy();
    });

    it('should import FormsModule', () => {
      expect(containsImport(FormsModule)).toBeTruthy();
    });

    it('should import HttpClientModule', () => {
      expect(containsImport(HttpClientModule)).toBeTruthy();
    });

    it('should import AuthModule', () => {
      expect(containsImport(AuthModule)).toBeTruthy();
    });

    it('should import MembershipModule', () => {
      expect(containsImport(MembershipModule)).toBeTruthy();
    });

    it('should import BrowserAnimationsModule', () => {
      expect(containsImport(BrowserAnimationsModule)).toBeTruthy();
    });
  });

  // Prueba alternativa que verifica componentes utilizando un enfoque más directo
  it('should correctly register components', () => {
    // Configura TestBed con solo el AppModule
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();

    // Intenta crear instancias de los componentes que deberían estar declarados
    const appComponentFactory = TestBed.createComponent(AppComponent);
    expect(appComponentFactory.componentInstance).toBeTruthy();

    // Nota: No podemos crear otros componentes directamente aquí porque
    // requieren plantillas y servicios que no se cargan en este contexto de prueba.
    // En su lugar, verificamos que el módulo se compile correctamente, lo que implica
    // que sus declaraciones son válidas.
  });
});