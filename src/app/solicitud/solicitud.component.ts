import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar [(ngModel)]

@Component({
  selector: 'app-solicitud',
  standalone: true, // Definir como componente standalone
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
  imports: [FormsModule] // Importar FormsModule directamente
})
export class SolicitudComponent {
  monto: number = 0; // Inicializar el monto
  opcion: number = 0; // Almacena la opción seleccionada: 1 mes o 6 meses
  interes: number = 0; // Interés basado en la opción seleccionada
  cuotas: number = 0; // Número de cuotas basado en la opción seleccionada
  montoTotal: number = 0; // Resultado del monto total

  // Método para seleccionar opción (1 mes o 6 meses)
  seleccionarOpcion(opcion: number): void {
    this.opcion = opcion;
    // Asignar interés y cuotas en función de la opción
    this.interes = opcion === 1 ? 10 : 20; 
    this.cuotas = opcion === 1 ? 1 : 6; 
  }

  // Método para calcular el préstamo basado en el monto y el interés
  calcularPrestamo(): void {
    if (this.monto > 0) { // Validar que el monto sea mayor a 0
      this.montoTotal = this.monto + (this.monto * this.interes / 100);
    } else {
      alert('Ingrese un monto válido.'); // Alerta si el monto es inválido
    }
  }

  // Método para aprobar el préstamo y mostrar el monto total
  aprobarPrestamo(): void {
    if (this.montoTotal > 0) { // Validar que se haya calculado un monto total
      alert('Préstamo aprobado por un total de S/' + this.montoTotal);
    } else {
      alert('Realice el cálculo antes de aprobar el préstamo.'); // Alerta si no se ha calculado aún
    }
  }
}