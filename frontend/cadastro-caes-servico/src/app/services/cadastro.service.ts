import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cadastro } from '../models/cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = 'http://localhost:8765/ms-cadastro/cadastros';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cadastro[]> {
    return this.http.get<Cadastro[]>(this.apiUrl);
  }

  findById(id: number): Observable<Cadastro> {
    return this.http.get<Cadastro>(`${this.apiUrl}/findById/${id}`);
  }

  save(id: number, cadastro: Cadastro): Observable<Cadastro> {
    return this.http.post<Cadastro>(`${this.apiUrl}/save/${id}`, cadastro);
  }

  update(id: number, cadastro: Cadastro): Observable<Cadastro> {
    return this.http.put<Cadastro>(`${this.apiUrl}/update/${id}`, cadastro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
