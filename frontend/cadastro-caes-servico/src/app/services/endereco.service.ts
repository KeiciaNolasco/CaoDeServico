import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/enderecos';

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

  findAll(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  findById(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.apiUrl}/findById/${id}`, { headers: this.getAuthHeaders() });
  }

  save(id: number, endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.apiUrl}/save/${id}`, endereco, { headers: this.getAuthHeaders() });
  }

  update(id: number, endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.apiUrl}/update/${id}`, endereco, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }
}
