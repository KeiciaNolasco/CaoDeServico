import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Condutor } from '../models/condutor';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})

export class CondutorService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/condutores';

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

  findAll(): Observable<Condutor[]> {
    return this.http.get<Condutor[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  findById(id: number): Observable<Condutor> {
    return this.http.get<Condutor>(`${this.apiUrl}/findById/${id}`, { headers: this.getAuthHeaders() });
  }

  save(id: number, formData: FormData): Observable<Condutor> {
    return this.http.post<Condutor>(`${this.apiUrl}/save/${id}`, formData, { headers: this.getAuthHeaders() });
  }

  update(id: number, formData: FormData): Observable<Condutor> {
    return this.http.put<Condutor>(`${this.apiUrl}/update/${id}`, formData, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }
}
