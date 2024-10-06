import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CronogramaPagoType } from '../../types/cronogramaPago.type';

@Injectable({
  providedIn: 'root',
})
export class CronogramaPagoService {
  private apiUrl = 'https://prestanet-api.onrender.com/api/cronograma';

  constructor(private http: HttpClient) {}

  // Crear un nuevo CronogramaPago
  createCronogramaPago(
    cronogramaPago: CronogramaPagoType
  ): Observable<CronogramaPagoType> {
    return this.http
      .post<CronogramaPagoType>(this.apiUrl, cronogramaPago, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        catchError(this.handleError<CronogramaPagoType>('createCronogramaPago'))
      );
  }

  // Leer todos los CronogramaPagos
  getAllCronogramaPagos(): Observable<CronogramaPagoType[]> {
    return this.http
      .get<CronogramaPagoType[]>(this.apiUrl)
      .pipe(
        catchError(
          this.handleError<CronogramaPagoType[]>('getAllCronogramaPagos', [])
        )
      );
  }

  // Leer un CronogramaPago por ID
  getCronogramaPagoById(id: number): Observable<CronogramaPagoType | null> {
    return this.http
      .get<CronogramaPagoType>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(
          this.handleError<CronogramaPagoType>('getCronogramaPagoById')
        )
      );
  }

  // Actualizar un CronogramaPago existente
  updateCronogramaPago(
    id: number,
    cronogramaPago: CronogramaPagoType
  ): Observable<CronogramaPagoType | null> {
    return this.http
      .put<CronogramaPagoType>(`${this.apiUrl}/${id}`, cronogramaPago, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        catchError(this.handleError<CronogramaPagoType>('updateCronogramaPago'))
      );
  }

  // Eliminar un CronogramaPago por ID
  deleteCronogramaPagoById(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('deleteCronogramaPagoById')));
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
