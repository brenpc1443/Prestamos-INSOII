import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { UserService } from '../../services/usuario/usuario.service';
import { DniService } from '../../APIs/dni.service';
import { RucService } from '../../APIs/ruc.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.username, this.password).subscribe(
      (user) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
        }
      },
      (error) => {
        this.errorMessage =
          'Error al iniciar sesión. Inténtalo de nuevo más tarde.';
      }
    );
  }
}
