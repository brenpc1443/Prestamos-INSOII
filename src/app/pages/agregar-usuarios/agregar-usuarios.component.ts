import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Importación de módulos necesarios
})
export class AgregarUsuariosComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  // Lista simulada de usuarios para verificar si el nombre ya existe
  existingUsers: string[] = ['usuario1', 'usuario2', 'admin'];

  constructor(private router: Router) {}

  onSubmit() {
    // Validación de campos vacíos
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios';
      this.successMessage = '';
      return;
    }

    // Validación de coincidencia de contraseñas
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.successMessage = '';
      return;
    }

    // Validación de longitud mínima de la contraseña
    if (this.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      this.successMessage = '';
      return;
    }

    // Validación de si el nombre de usuario ya está en uso
    if (this.existingUsers.includes(this.username)) {
      this.errorMessage = 'El nombre de usuario ya está en uso. Elija otro.';
      this.successMessage = '';
      return;
    }

    // Si todo es válido, se simula la creación del usuario
    setTimeout(() => {
      // Simulamos la creación de un usuario
      this.existingUsers.push(this.username); // Agregamos el nuevo usuario a la lista simulada
      this.successMessage = 'Usuario creado exitosamente';
      this.errorMessage = '';
    }, 1000); // Simulación con un retraso de 1 segundo
  }

  // Lógica para regresar al dashboard
  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
