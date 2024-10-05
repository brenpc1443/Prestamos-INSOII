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
    this.cronograma = []; // Reiniciar el cronograma
    let totalCuotas: number;

    // Determinar el número de cuotas según el interés seleccionado
    if (this.tipoInteres === '1 mes') {
      totalCuotas = 1;  // 1 cuota
    } else if (this.tipoInteres === '6 meses') {
      totalCuotas = 6;  // 6 cuotas
    } else {
      return; // Si no hay selección, no hacer nada
    }

    // Calcular los pagos
    const cuotaFija = this.montoPrestamo / totalCuotas;
    for (let i = 1; i <= totalCuotas; i++) {
      this.cronograma.push({
        cuota: `Cuota ${i}`,
        fecha: this.calcularFechaPago(i),
        cuotaFija: cuotaFija.toFixed(2),
        interes: this.calcularInteres(i),
        total: (cuotaFija + this.calcularInteres(i)).toFixed(2)
      });
    }
  }

  // Método para calcular la fecha de pago
  calcularFechaPago(cuota: number): string {
    const fechaActual = new Date();
    fechaActual.setMonth(fechaActual.getMonth() + cuota);
    return fechaActual.toLocaleDateString(); // Formato de fecha
  }

  // Método para calcular el interés
  calcularInteres(cuota: number): number {
    const tasaInteres = this.tipoInteres === '1 mes' ? 0.1 : 0.2; // 10% o 20%
    return (this.montoPrestamo * tasaInteres) / 100; // Calcular el interés
  }
}

