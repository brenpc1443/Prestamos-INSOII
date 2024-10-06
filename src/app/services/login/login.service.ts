import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioType } from '../../types/usuario.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    return this.http.post<any>(this.apiUrl, { nombreUsuario: username, contraseña: password })
      .pipe(
        catchError(error => {
          console.error('Error en el servicio de login', error);
          return of(null);
        })
      );
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
