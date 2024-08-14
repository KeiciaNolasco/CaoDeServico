import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/findById/${id}`);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/save`, user, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((user: User) => {
        console.log('ID do usuário criado:', user.id);
      })
    );
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  findByEmail(email: string): Observable<User> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<User>(`${this.apiUrl}/email/${email}`, { headers })
        .pipe(
          tap((user: User) => {
            console.log('ID do usuário encontrado:', user.id);
          })
        );
    } else {
      console.error('Token não encontrado!');
      return new Observable<User>();
    }
  }
}