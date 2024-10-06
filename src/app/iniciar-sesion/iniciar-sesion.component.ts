import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,  
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
  imports: [FormsModule]  
})
export class IniciarSesionComponent {
  usuario: string = '';  // Almacena el nombre de usuario
  contrasena: string = '';  // Almacena la contraseña

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    console.log(`Usuario: ${this.usuario}, Contraseña: ${this.contrasena}`);
  }
}