import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corregido de `styleUrl` a `styleUrls` (error menor)
})
export class DashboardComponent {
  constructor(private router: Router) {}

  /**
   * Método para navegar hacia una ruta específica
   * @param path - Ruta a la que se desea navegar
   */
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
