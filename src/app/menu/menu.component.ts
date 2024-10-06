import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router) { }

  onCronogramaPagos() {
    // Navega a la página de cronograma de pagos
    this.router.navigate(['/cronograma-pagos']);
  }

  onCrearSolicitud() {
    // Navega a la página para crear una solicitud
    this.router.navigate(['/crear-solicitud']);
  }
}