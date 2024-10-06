import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioType } from '../../types/usuario.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/usuarios/login';

  constructor(private http: HttpClient) {}

  login(nombreUsuario: string, contraseña: string): Observable<UsuarioType> {
    const url = `${this.apiUrl}?nombreUsuario=${nombreUsuario}&contrasena=${contraseña}`;

    return this.http.get<UsuarioType>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = 'Nombre de usuario o contraseña incorrectos.';
      } else {
        errorMessage = `Error en el servidor: ${error.message}`;
      }
    }

    console.error(errorMessage);
    return throwError(errorMessage); // Lanza el error para que el componente lo maneje
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
