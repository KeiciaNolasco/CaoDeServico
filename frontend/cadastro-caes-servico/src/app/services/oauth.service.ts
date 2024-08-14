import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { OAuthResponse } from '../models/oauth';

@Injectable({
  providedIn: 'root',
})

export class OAuthService { 
  private apiUrl = 'http://localhost:8765/ms-oauth/oauth'; 

  private tokenSubject: BehaviorSubject<string | null>;
  public token$: Observable<string | null>;

  constructor(
    private http: HttpClient, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const token = this.isBrowser() ? localStorage.getItem('token') : null;
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.token$ = this.tokenSubject.asObservable();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): Observable<string> { 
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');
  
    return this.http.post(`${this.apiUrl}/login`, body.toString(), { headers, responseType: 'text' })
      .pipe(
        tap((token: string) => {
          this.storeToken(token);
        })
      );
  }
  
  private storeToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
    this.tokenSubject.next(token);
  }  

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); 
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }
}