import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8765/ms-user/users';

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

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/findById/${id}`, { headers: this.getAuthHeaders() });
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/save`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  adminSave(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/admin/save`, user, { headers: this.getAuthHeaders() });
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, user, { headers: this.getAuthHeaders() });
  }

  adminUpdate(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/admin/update/${id}`, user, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email/${email}`, { headers: this.getAuthHeaders() });
  }
}