import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cao } from '../models/cao';

@Injectable({
  providedIn: 'root'
})
export class CaoService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/caesdeservicos';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cao[]> {
    return this.http.get<Cao[]>(this.apiUrl);
  }

  findById(id: number): Observable<Cao> {
    return this.http.get<Cao>(`${this.apiUrl}/findById/${id}`);
  }

  save(id: number, cao: Cao): Observable<Cao> {
    return this.http.post<Cao>(`${this.apiUrl}/save/${id}`, cao);
  }

  update(id: number, cao: Cao): Observable<Cao> {
    return this.http.put<Cao>(`${this.apiUrl}/update/${id}`, cao);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
