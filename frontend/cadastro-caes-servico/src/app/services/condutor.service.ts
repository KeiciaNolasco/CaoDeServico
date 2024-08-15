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

  findAll(): Observable<Condutor[]> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Condutor[]>(this.apiUrl, { headers })
    } else {
      console.error('Token não encontrado!');
      return new Observable<Condutor[]>();
    }
  }

  findById(id: number): Observable<Condutor> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    return this.http.get<Condutor>(`${this.apiUrl}/findById/${id}`, { headers })
    } else {
      console.error('Token não encontrado!');
      return new Observable<Condutor>();
    }
  }

  save(id: number, formData: FormData): Observable<Condutor> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<Condutor>(`${this.apiUrl}/save/${id}`, formData, { headers })
    } else {
      console.error('Token não encontrado!');
      return new Observable<Condutor>();
    }
  }

  update(id: number, condutor: Condutor): Observable<Condutor> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    return this.http.put<Condutor>(`${this.apiUrl}/update/${id}`, condutor, { headers })
  } else {
    console.error('Token não encontrado!');
    return new Observable<Condutor>();
  }
}

  delete(id: number): Observable<void> {
    const token = this.oauthService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers })
    } else {
      console.error('Token não encontrado!');
      return new Observable<void>();
    }
  }
}
