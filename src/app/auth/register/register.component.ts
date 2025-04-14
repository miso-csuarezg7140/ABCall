import { Component, OnInit } from '@angular/core';
import { Register } from '../../interfaces/register'
import { RegisterService } from '../../services/register/registerService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  cliente: Register = {
    documentNumber: '',
    socialReason: '',
    email: '',
    password: ''
  };

  confirmPassword: string = '';

  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService
  ){}

  ngOnInit():void {
  }

  registrar() {
    if (this.cliente.password !== this.confirmPassword) {
      this.toastr.warning('Las contraseñas no coinciden');
      return;
    }

    this.registerService.registerCliente(this.cliente).subscribe({
      next: (response: { statusCode: number; statusDescription: any; }) => {
        if (response.statusCode === 200) {
          this.toastr.success('Registro exitoso');
        } else if (response.statusCode === 206 && response.statusDescription === "Error de negocio.") {
          this.toastr.warning('Verifica tus datos. Es posible que ya exista un cliente con este documento o correo.');
        } else {
          this.toastr.warning(response.statusDescription || 'Registro con advertencias');
        }
      },
      error: (error: { error: { statusDescription: any; }; }) => {
        this.toastr.error('Error a regsitrar: ' + (error.error?.statusDescription || 'Error desconocido'));
      }
    });
  }

}
