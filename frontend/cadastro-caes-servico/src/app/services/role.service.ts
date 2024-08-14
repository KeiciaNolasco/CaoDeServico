import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  findAll(): Observable<Role[]> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Role[]>(this.apiUrl, { headers })
    } else {
      console.error('Token não encontrado!');
      return new Observable<Role[]>();
    }
  }

  findById(id: number): Observable<Role> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Role>(`${this.apiUrl}/findById/${id}`, { headers })
    } else {
      console.error('Token não encontrado!');
      return new Observable<Role>();
    }
  }

  save(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/save`, role, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((role: Role) => {
        console.log('ID do perfil criado:', role.id);
      })
    );
  }

  update(id: number, user: Role): Observable<Role> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put<Role>(`${this.apiUrl}/update/${id}`, user, { headers })
    } else {
      console.error('Token não encontrado!');
      return new Observable<Role>();
    }
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  findByNome(nome: string): Observable<Role> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Role>(`${this.apiUrl}/nome/${nome}`, { headers })
    } else {
      console.error('Token não encontrado!');
      return new Observable<Role>();
    }
  }
}