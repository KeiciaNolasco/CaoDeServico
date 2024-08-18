import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cadastro } from '../models/cadastro';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/cadastros';

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

  findAll(): Observable<Cadastro[]> {
    return this.http.get<Cadastro[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  findById(id: number): Observable<Cadastro> {
    return this.http.get<Cadastro>(`${this.apiUrl}/findById/${id}`, { headers: this.getAuthHeaders() });
  }

  save(id: number, cadastro: Cadastro): Observable<Cadastro> {
    return this.http.post<Cadastro>(`${this.apiUrl}/save/${id}`, cadastro, { headers: this.getAuthHeaders() });
  }

  update(id: number, cadastro: Cadastro): Observable<Cadastro> {
    return this.http.put<Cadastro>(`${this.apiUrl}/update/${id}`, cadastro, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }
}
