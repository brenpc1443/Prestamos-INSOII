import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent {
  currentPassword: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {
    // Simulamos que el nombre de usuario es cargado desde el servicio de usuario actual
    const currentUser = { nombreUsuario: 'usuarioEjemplo' };  // Simulación de datos
    this.username = currentUser?.nombreUsuario || '';  // Precarga el nombre de usuario
  }

  onSubmit() {
    // Validar que los campos no estén vacíos
    if (!this.currentPassword || !this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      this.successMessage = '';  // Limpiar mensaje de éxito
      return;
    }

    // Validar que la nueva contraseña tenga al menos 8 caracteres
    if (this.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
      this.successMessage = '';  // Limpiar mensaje de éxito
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.successMessage = '';  // Limpiar mensaje de éxito
      return;
    }

    // Simulamos una comprobación de si el nombre de usuario ya está en uso
    const existingUsernames = ['usuarioEjemplo']; // Simulación de nombres de usuario existentes
    if (existingUsernames.includes(this.username)) {
      this.errorMessage = 'El nombre de usuario ya está en uso. Por favor, elija otro.';
      this.successMessage = '';  // Limpiar mensaje de éxito
      return;
    }

    // Simular la actualización del perfil con un retraso
    setTimeout(() => {
      if (this.username && this.password) {
        // Simulación de actualización exitosa
        this.successMessage = 'Datos actualizados exitosamente.';
        this.errorMessage = '';  // Limpiar mensaje de error
      } else {
        // Simulación de error
        this.successMessage = '';  // Limpiar mensaje de éxito
        this.errorMessage = 'Hubo un problema al actualizar el perfil.';
      }
    }, 1000);
  }

  // Función para regresar al dashboard
  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
