import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RucService {
  private apiUrl = 'https://dniruc.apisperu.com/api/v1/ruc';

  private token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IkJSQVlBTlAuQ0FCUkVSQUBHTUFJTC5DT00ifQ.SFE5BuvItc9N68U5JzfxVK4FKA1PiVio5T-U2hL8dGQ';

  constructor(private http: HttpClient) {}

  getRUC(ruc: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${ruc}?token=${this.token}`);
  }
}
