import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioType } from '../../types/usuario.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  crearUsuario(usuarioDTO: UsuarioType): Observable<UsuarioType> {
    return this.http
      .post<UsuarioType>(this.apiUrl, usuarioDTO, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError<UsuarioType>('crearUsuario')));
  }

  obtenerUsuarioPorId(id: number): Observable<UsuarioType | null> {
    return this.http
      .get<UsuarioType>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<UsuarioType>('obtenerUsuarioPorId')));
  }

  listarUsuarios(): Observable<UsuarioType[]> {
    return this.http
      .get<UsuarioType[]>(this.apiUrl)
      .pipe(catchError(this.handleError<UsuarioType[]>('listarUsuarios', [])));
  }

  actualizarUsuario(
    id: number,
    usuarioDTO: UsuarioType
  ): Observable<UsuarioType | null> {
    return this.http
      .put<UsuarioType>(`${this.apiUrl}/${id}`, usuarioDTO, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError<UsuarioType>('actualizarUsuario')));
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('eliminarUsuario')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
