import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RegisterClientComponent } from './register-client.component';
import { RegisterService } from '../../services/register-client/register-client.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('RegisterClientComponent', () => {
    let component: RegisterClientComponent;
    let fixture: ComponentFixture<RegisterClientComponent>;
    let registerServiceMock: jasmine.SpyObj<RegisterService>;
    let toastrMock: jasmine.SpyObj<ToastrService>;

    beforeEach(async () => {
        registerServiceMock = jasmine.createSpyObj('RegisterService', ['registerClient']);
        toastrMock = jasmine.createSpyObj('ToastrService', ['success', 'warning', 'error']);

        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [RegisterClientComponent],
            providers: [
                { provide: RegisterService, useValue: registerServiceMock },
                { provide: ToastrService, useValue: toastrMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RegisterClientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should initialize component correctly', () => {
            expect(component.cliente).toBeDefined();
            expect(component.confirmPassword).toBe('');
        });
    });

    describe('registrar', () => {
        it('should show warning if passwords do not match', () => {
            // Setup
            component.cliente.contrasena = 'password123';
            component.confirmPassword = 'differentPassword';

            // Call the method
            component.registrar();

            // Verify
            expect(toastrMock.warning).toHaveBeenCalledWith('Las contraseñas no coinciden');
            expect(registerServiceMock.registerClient).not.toHaveBeenCalled();
        });

        // ...existing code...

        it('should call registerClient service and show success toast on successful registration', () => {
            // Setup
            component.cliente = {
                numeroDocumento: '12345678',
                razonSocial: 'Test Company',
                correo: 'test@example.com',
                contrasena: 'password123'
            };
            component.confirmPassword = 'password123';

            const successResponse = {
                statusCode: 200,
                statusDescription: 'OK',
                data: [] // Added missing required property
            };
            registerServiceMock.registerClient.and.returnValue(of(successResponse));

            // Call the method
            component.registrar();

            // Verify
            expect(registerServiceMock.registerClient).toHaveBeenCalledWith(component.cliente);
            expect(toastrMock.success).toHaveBeenCalledWith('Registro exitoso');
        });

        it('should show warning toast when response indicates business error', () => {
            // Setup
            component.cliente = {
                numeroDocumento: '12345678',
                razonSocial: 'Test Company',
                correo: 'test@example.com',
                contrasena: 'password123'
            };
            component.confirmPassword = 'password123';

            const warningResponse = {
                statusCode: 206,
                statusDescription: 'Error de negocio.',
                data: [] // Added missing required property
            };
            registerServiceMock.registerClient.and.returnValue(of(warningResponse));

            // Call the method
            component.registrar();

            // Verify
            expect(registerServiceMock.registerClient).toHaveBeenCalledWith(component.cliente);
            expect(toastrMock.warning).toHaveBeenCalledWith(
                'Verifica tus datos. Es posible que ya exista un cliente con este documento o correo.'
            );
        });

        it('should show warning toast for other non-200 responses', () => {
            // Setup
            component.cliente = {
                numeroDocumento: '12345678',
                razonSocial: 'Test Company',
                correo: 'test@example.com',
                contrasena: 'password123'
            };
            component.confirmPassword = 'password123';

            const otherResponse = {
                statusCode: 201,
                statusDescription: 'Created',
                data: [] // Added missing required property
            };
            registerServiceMock.registerClient.and.returnValue(of(otherResponse));

            // Call the method
            component.registrar();

            // Verify
            expect(registerServiceMock.registerClient).toHaveBeenCalledWith(component.cliente);
            expect(toastrMock.warning).toHaveBeenCalledWith('Created');
        });

        // ...existing code...

        it('should show error toast when service call fails', () => {
            // Setup
            component.cliente = {
                numeroDocumento: '12345678',
                razonSocial: 'Test Company',
                correo: 'test@example.com',
                contrasena: 'password123'
            };
            component.confirmPassword = 'password123';

            const errorResponse = { error: { statusDescription: 'Server Error' } };
            registerServiceMock.registerClient.and.returnValue(throwError(() => errorResponse));

            // Call the method
            component.registrar();

            // Verify
            expect(registerServiceMock.registerClient).toHaveBeenCalledWith(component.cliente);
            expect(toastrMock.error).toHaveBeenCalledWith('Error a regsitrar: Server Error');
        });

        it('should handle error response without statusDescription', () => {
            // Setup
            component.cliente = {
                numeroDocumento: '12345678',
                razonSocial: 'Test Company',
                correo: 'test@example.com',
                contrasena: 'password123'
            };
            component.confirmPassword = 'password123';

            const errorResponse = { error: {} };
            registerServiceMock.registerClient.and.returnValue(throwError(() => errorResponse));

            // Call the method
            component.registrar();

            // Verify
            expect(registerServiceMock.registerClient).toHaveBeenCalledWith(component.cliente);
            expect(toastrMock.error).toHaveBeenCalledWith('Error a regsitrar: Error desconocido');
        });
    });
});