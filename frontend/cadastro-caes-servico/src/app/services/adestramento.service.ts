import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adestramento } from '../models/adestramento';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class AdestramentoService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/adestramentos';

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.oauthService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  findAll(): Observable<Adestramento[]> {
    return this.http.get<Adestramento[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  findById(id: number): Observable<Adestramento> {
    return this.http.get<Adestramento>(`${this.apiUrl}/findById/${id}`, { headers: this.getAuthHeaders() });
  }

  save(id: number, adestramento: Adestramento): Observable<Adestramento> {
    return this.http.post<Adestramento>(`${this.apiUrl}/save/${id}`, adestramento, { headers: this.getAuthHeaders() });
  }

  update(id: number, adestramento: Adestramento): Observable<Adestramento> {
    return this.http.put<Adestramento>(`${this.apiUrl}/update/${id}`, adestramento, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }
}
