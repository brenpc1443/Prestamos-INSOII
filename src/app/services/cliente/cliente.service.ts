import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteType } from '../../types/cliente.type';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'https://prestanet-api.onrender.com/api/clientes';

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  getAllClientes(): Observable<ClienteType[]> {
    return this.http
      .get<ClienteType[]>(this.apiUrl)
      .pipe(catchError(this.handleError<ClienteType[]>('getAllClientes', [])));
  }

  // Obtener cliente por ID
  getClienteById(id: number): Observable<ClienteType | null> {
    return this.http
      .get<ClienteType>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<ClienteType>('getClienteById')));
  }

  // Crear un nuevo cliente
  createCliente(cliente: ClienteType): Observable<ClienteType> {
    return this.http
      .post<ClienteType>(this.apiUrl, cliente, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError<ClienteType>('createCliente')));
  }

  // Actualizar un cliente existente
  updateCliente(id: number, cliente: ClienteType): Observable<ClienteType | null> {
    return this.http
      .put<ClienteType>(`${this.apiUrl}/${id}`, cliente, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError<ClienteType>('updateCliente')));
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('deleteCliente')));
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCurrentClient() {
    return JSON.parse(localStorage.getItem('currentClient') || '{}');
  }

}
