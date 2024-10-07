import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { DniService } from '../../APIs/dni.service';
import { ClienteService } from '../../services/cliente/cliente.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-validar-usuario',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './validar-usuario.component.html',
  styleUrls: ['./validar-usuario.component.css'],
})
export class ValidarUsuarioComponent {
  nombreSolicitante: string = '';
  dni: string = '';

  validacionExitosa: boolean | null = null;
  mensajeValidacion: string = '';

  constructor(
    private clienteService: ClienteService,
    private dniService: DniService,
    private router: Router
  ) {}

  validar() {
    const nombreValido = this.nombreSolicitante.trim().length > 0;
    const dniValido = this.dni.trim().length === 8 && !isNaN(Number(this.dni));

    if (nombreValido && dniValido) {
      this.dniService.getDNI(this.dni).subscribe(
        (response) => {
          const nombres: string = response?.data?.nombre_completo || '';

          if (
            nombres.replace(/,/g, '') === this.nombreSolicitante.toUpperCase()
          ) {
            this.validacionExitosa = true;
            this.mensajeValidacion = '';

            this.clienteService
              .createCliente({
                nombreCliente: this.nombreSolicitante.toUpperCase(),
                dni: this.dni,
              })
              .subscribe(
                (client) => {
                  localStorage.setItem('currentClient', JSON.stringify(client));
                  console.warn('acción realizada con exito')
                },
                (error) => {
                  console.error('Ocurrió un error durante el registro.');
                }
              );

            this.router.navigate(['/solicitud']);
          } else {
            this.validacionExitosa = false;
            this.mensajeValidacion = 'Los datos no coinciden';
          }
        },
        (error: HttpErrorResponse) => {
          this.validacionExitosa = false;
          this.mensajeValidacion = 'Error al validar el DNI';
          console.error('Error en la API', error);
        }
      );
    } else {
      this.validacionExitosa = false;
      this.mensajeValidacion =
        'Por favor, complete todos los campos correctamente';
    }
  }
}
