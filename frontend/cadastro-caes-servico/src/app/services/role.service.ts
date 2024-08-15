import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8765/ms-user/roles';

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

  findAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  findById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/findById/${id}`, { headers: this.getAuthHeaders() });
  }

  save(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/save`, role, { headers: this.getAuthHeaders() });
  }

  update(id: number, user: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/update/${id}`, user, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  findByNome(nome: string): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/nome/${nome}`, { headers: this.getAuthHeaders() });
  }
}