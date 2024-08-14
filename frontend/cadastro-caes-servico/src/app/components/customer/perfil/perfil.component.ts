import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true, 
  imports: [NavbarComponent, FooterComponent, RouterModule],
})
export class PerfilComponent implements OnInit {
  userProfile: any;

  constructor(
    private authService: OAuthService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.loadUserProfile();
    } else {
      console.error('Usuário não autenticado!');
    }
  }

  loadUserProfile(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const id = decodedToken.id;
        this.http.get(`https://localhost:4200/perfil/${id}`).subscribe({
          next: (data: any) => {
            this.userProfile = data;
          },
          error: (error) => {
            console.error('Erro ao carregar o perfil do usuário', error);
          }
        });
      } catch (error) {
        console.error('Erro ao decodificar o token JWT', error);
      }
    } else {
      console.error('Token não encontrado ou inválido');
    }
  }
}