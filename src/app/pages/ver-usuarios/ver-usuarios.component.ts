import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Asegúrate de importar el Router

@Component({
  selector: 'app-ver-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent {
  // Lista simulada de usuarios, puedes reemplazarla por una llamada al backend
  users: { username: string, password: string }[] = [
    { username: 'usuario1', password: 'password1' },
    { username: 'usuario2', password: 'password2' },
    { username: 'admin', password: 'adminpass' },
  ];

  // Inyección del Router en el constructor
  constructor(private router: Router) {}

  // Método para regresar al Dashboard
  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
