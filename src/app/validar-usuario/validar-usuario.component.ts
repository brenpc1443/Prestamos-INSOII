import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';  // <-- Importa NgIf

@Component({
  selector: 'app-validar-usuario',
  standalone: true,
  imports: [FormsModule, NgIf],  // <-- Importa NgIf aquí
  templateUrl: './validar-usuario.component.html',
  styleUrls: ['./validar-usuario.component.css']
})
export class ValidarUsuarioComponent {
  nombreSolicitante: string = '';
  dni: string = '';
  
  validacionExitosa: boolean | null = null;
  mensajeValidacion: boolean = false;

  validar() {
    const nombreValido = this.nombreSolicitante.trim().length > 0;
    const dniValido = this.dni.trim().length === 8 && !isNaN(Number(this.dni));

    if (nombreValido && dniValido) {
      this.validacionExitosa = true;
    } else {
      this.validacionExitosa = false;
    }

    this.mensajeValidacion = true;
  }
}
