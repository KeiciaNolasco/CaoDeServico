import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Condutor } from '../models/condutor';

@Injectable({
  providedIn: 'root'
})
export class CondutorService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/condutores';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Condutor[]> {
    return this.http.get<Condutor[]>(this.apiUrl);
  }

  findById(id: number): Observable<Condutor> {
    return this.http.get<Condutor>(`${this.apiUrl}/findById/${id}`);
  }

  save(id: number, condutor: Condutor): Observable<Condutor> {
    return this.http.post<Condutor>(`${this.apiUrl}/save/${id}`, condutor);
  }

  update(id: number, condutor: Condutor): Observable<Condutor> {
    return this.http.put<Condutor>(`${this.apiUrl}/update/${id}`, condutor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
