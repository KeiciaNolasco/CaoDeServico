import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adestramento } from '../models/adestramento';

@Injectable({
  providedIn: 'root'
})
export class AdestramentoService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/adestramentos';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Adestramento[]> {
    return this.http.get<Adestramento[]>(this.apiUrl);
  }

  findById(id: number): Observable<Adestramento> {
    return this.http.get<Adestramento>(`${this.apiUrl}/findById/${id}`);
  }

  save(id: number, adestramento: Adestramento): Observable<Adestramento> {
    return this.http.post<Adestramento>(`${this.apiUrl}/save/${id}`, adestramento);
  }

  update(id: number, adestramento: Adestramento): Observable<Adestramento> {
    return this.http.put<Adestramento>(`${this.apiUrl}/update/${id}`, adestramento);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
