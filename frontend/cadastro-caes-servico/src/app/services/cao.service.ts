import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cao } from '../models/cao';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})

export class CaoService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/caesdeservicos';

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

  findAll(): Observable<Cao[]> {
    return this.http.get<Cao[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  findById(id: number): Observable<Cao> {
    return this.http.get<Cao>(`${this.apiUrl}/findById/${id}`, { headers: this.getAuthHeaders() });
  }

  save(id: number, formData: FormData): Observable<Cao> {
    return this.http.post<Cao>(`${this.apiUrl}/save/${id}`, formData, { headers: this.getAuthHeaders() });
  }

  update(id: number, formData: FormData): Observable<Cao> {
    return this.http.put<Cao>(`${this.apiUrl}/update/${id}`, formData, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }
}
