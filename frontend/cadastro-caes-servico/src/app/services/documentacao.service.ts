import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documentacao } from '../models/documentacao';

@Injectable({
  providedIn: 'root'
})
export class DocumentacaoService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/documentacoes';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Documentacao[]> {
    return this.http.get<Documentacao[]>(this.apiUrl);
  }

  findById(id: number): Observable<Documentacao> {
    return this.http.get<Documentacao>(`${this.apiUrl}/findById/${id}`);
  }

  save(id: number, documentacao: Documentacao): Observable<Documentacao> {
    return this.http.post<Documentacao>(`${this.apiUrl}/save/${id}`, documentacao);
  }

  update(id: number, documentacao: Documentacao): Observable<Documentacao> {
    return this.http.put<Documentacao>(`${this.apiUrl}/update/${id}`, documentacao);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
