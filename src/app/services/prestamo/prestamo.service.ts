import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PrestamoType } from '../../types/prestamo.type';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private apiUrl = 'https://prestanet-api.onrender.com/api/prestamos';

  constructor(private http: HttpClient) {}

  // Registrar una solicitud de préstamo
  registrarSolicitudPrestamo(
    prestamoDTO: PrestamoType,
    dniCliente: string
  ): Observable<string> {
    return this.http
      .post<string>(
        `${this.apiUrl}/solicitud?dniCliente=${dniCliente}`,
        prestamoDTO,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(catchError(this.handleError<string>('registrarSolicitudPrestamo')));
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
