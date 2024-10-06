import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

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

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe(
      (user) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/validar-usuario']);
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
