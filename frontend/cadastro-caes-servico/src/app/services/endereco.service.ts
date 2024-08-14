import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/enderecos';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.apiUrl);
  }

  findById(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.apiUrl}/findById/${id}`);
  }

  save(id: number, endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.apiUrl}/save/${id}`, endereco);
  }

  update(id: number, endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.apiUrl}/update/${id}`, endereco);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
