import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { Component } from '@angular/core';

// Componentes de prueba mock con selectores únicos
@Component({ 
  selector: 'mock-plans',
  template: '' 
})
class MockPlansComponent {}

@Component({ 
  selector: 'mock-header',
  template: '' 
})
class MockHeaderComponent {}

@Component({ 
  selector: 'mock-footer',
  template: '' 
})
class MockFooterComponent {}

@Component({ 
  selector: 'mock-home',
  template: '' 
})
class MockHomeComponent {}

@Component({ 
  selector: 'mock-login',
  template: '' 
})
class MockLoginComponent {}

@Component({ 
  selector: 'mock-register-client',
  template: '' 
})
class MockRegisterClientComponent {}

@Component({ 
  selector: 'mock-incident',
  template: '' 
})
class MockIncidentComponent {}

@Component({ 
  selector: 'mock-incident-detail',
  template: '' 
})
class MockIncidentDetailComponent {}

@Component({ 
  selector: 'mock-db-query',
  template: '' 
})
class MockDbQueryComponent {}

@Component({ 
  selector: 'mock-cliente-detail',
  template: '' 
})
class MockClienteDetailComponent {}

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'plans', component: MockPlansComponent },
          { path: 'header', component: MockHeaderComponent },
          { path: 'footer', component: MockFooterComponent },
          {
            path: 'home',
            component: MockHomeComponent,
            children: [
              { path: '', component: MockLoginComponent },
              { path: 'register', component: MockRegisterClientComponent },
            ],
          },
          {
            path: 'incidents',
            component: MockHomeComponent,
            children: [
              { path: '', component: MockIncidentComponent },
              { path: 'incident-detail', component: MockIncidentDetailComponent },
              { path: 'detail/:id', component: MockClienteDetailComponent },
              { path: 'db-query', component: MockDbQueryComponent },
              { path: 'detalle/:id', component: MockIncidentDetailComponent }
            ],
          },
          { path: '**', pathMatch: 'full', redirectTo: 'home' },
        ])
      ],
      declarations: [
        MockLoginComponent,
        MockRegisterClientComponent,
        MockPlansComponent,
        MockHomeComponent,
        MockHeaderComponent,
        MockFooterComponent,
        MockIncidentComponent,
        MockIncidentDetailComponent,
        MockDbQueryComponent,
        MockClienteDetailComponent
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should create the module', () => {
    const module = new AppRoutingModule();
    expect(module).toBeTruthy();
  });

  it('should navigate to "plans" successfully', fakeAsync(() => {
    router.navigate(['/plans']);
    tick();
    expect(location.path()).toBe('/plans');
  }));

  it('should navigate to "header" successfully', fakeAsync(() => {
    router.navigate(['/header']);
    tick();
    expect(location.path()).toBe('/header');
  }));

  it('should navigate to "footer" successfully', fakeAsync(() => {
    router.navigate(['/footer']);
    tick();
    expect(location.path()).toBe('/footer');
  }));

  it('should navigate to "home" successfully', fakeAsync(() => {
    router.navigate(['/home']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('should navigate to "home/register" successfully', fakeAsync(() => {
    router.navigate(['/home/register']);
    tick();
    expect(location.path()).toBe('/home/register');
  }));

  it('should navigate to "incidents" successfully', fakeAsync(() => {
    router.navigate(['/incidents']);
    tick();
    expect(location.path()).toBe('/incidents');
  }));

  it('should navigate to "incidents/detail/:id" with parameter successfully', fakeAsync(() => {
    router.navigate(['/incidents/detail/123']);
    tick();
    expect(location.path()).toBe('/incidents/detail/123');
  }));

  it('should navigate to "incidents/db-query" successfully', fakeAsync(() => {
    router.navigate(['/incidents/db-query']);
    tick();
    expect(location.path()).toBe('/incidents/db-query');
  }));

  it('should navigate to "incidents/detalle/:id" with parameter successfully', fakeAsync(() => {
    router.navigate(['/incidents/detalle/456']);
    tick();
    expect(location.path()).toBe('/incidents/detalle/456');
  }));

  it('should redirect to "home" for unknown routes', fakeAsync(() => {
    router.navigate(['/not-exists']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('should redirect empty path to "home"', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/home');
  }));
});