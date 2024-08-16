import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documentacao } from '../models/documentacao';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentacaoService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/documentacoes';

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

  findAll(): Observable<Documentacao[]> {
    return this.http.get<Documentacao[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  findById(id: number): Observable<Documentacao> {
    return this.http.get<Documentacao>(`${this.apiUrl}/findById/${id}`, { headers: this.getAuthHeaders() });
  }

  save(id: number, formData: FormData): Observable<Documentacao> {
    return this.http.post<Documentacao>(`${this.apiUrl}/save/${id}`, formData, { headers: this.getAuthHeaders() });
  }

  update(id: number, formData: FormData): Observable<Documentacao> {
    return this.http.put<Documentacao>(`${this.apiUrl}/update/${id}`, formData, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  downloadFile(id: number, type: string): Observable<Blob> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/download/${id}/${type}`, {
      headers,
      responseType: 'blob'
    });
  }
}
