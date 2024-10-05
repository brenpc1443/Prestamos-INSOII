import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DniService {
  private apiUrl = 'https://apiperu.dev/api/dni';

  private token =
    '9734ac6f78d2ecf65b2d35ae801c5cb989e817833f45e101a41bbaa52cf81fe2';

  constructor(private http: HttpClient) {}

  getDNI(dni: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${dni}/?api_token=${this.token}`);
  }
}
