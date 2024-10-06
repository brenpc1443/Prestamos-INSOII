import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DniService } from '../../APIs/dni.service';
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

  constructor(private dniService: DniService) {}

  validar() {
    const nombreValido = this.nombreSolicitante.trim().length > 0;
    const dniValido = this.dni.trim().length === 8 && !isNaN(Number(this.dni));

    if (nombreValido && dniValido) {
      this.dniService.getDNI(this.dni).subscribe(
        (response) => {
          const nombres: string = response?.data?.nombre_completo || '';

          if (nombres.replace(/,/g, '') === this.nombreSolicitante) {
            this.validacionExitosa = true;
            this.mensajeValidacion = '';
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
