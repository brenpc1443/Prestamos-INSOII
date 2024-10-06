import { Component } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cronograma',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent {
  montoPrestamo: number = 0;  // Monto del préstamo ingresado
  tipoInteres: string = '';    // Tipo de interés seleccionado
  cronograma: any[] = [];      // Array para almacenar el cronograma de pagos

  // Método para calcular el cronograma
  calcularCronograma() {
    console.log('Método calcularCronograma llamado');
    this.cronograma = []; // Reiniciar el cronograma
    let totalCuotas: number;
    let tasaInteres: number = 0;

    // Determinar el número de cuotas y tasa de interés según la opción seleccionada
    if (this.tipoInteres === '10% - 1 Mes') {
      totalCuotas = 1;  // 1 cuota
      tasaInteres = 0.10; // 10%
    } else if (this.tipoInteres === '20% - 6 Meses') {
      totalCuotas = 6;  // 6 cuotas
      tasaInteres = 0.20; // 20%
    } else {
      return; // Si no hay selección, no hacer nada
    }

    // Calcular la cuota fija
    const cuotaFija = this.montoPrestamo / totalCuotas;

    // Calcular el interés total
    const interesTotal = this.montoPrestamo * tasaInteres;
    const interesPorCuota = interesTotal / totalCuotas; // Interés por cuota

    // Agregar al cronograma
    for (let i = 1; i <= totalCuotas; i++) {
      this.cronograma.push({
        cuota: `Cuota ${i}`,
        fecha: this.calcularFechaPago(i),
        cuotaFija: cuotaFija.toFixed(2),
        interes: interesPorCuota.toFixed(2), // Interés por cuota
        total: (cuotaFija + interesPorCuota).toFixed(2) // Total a pagar por cuota
      });
    }
  }

  // Método para calcular la fecha de pago
  calcularFechaPago(cuota: number): string {
    const fechaActual = new Date();
    fechaActual.setMonth(fechaActual.getMonth() + cuota);
    return fechaActual.toLocaleDateString(); // Formato de fecha
  }
}