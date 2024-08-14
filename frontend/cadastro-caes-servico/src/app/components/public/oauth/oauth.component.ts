import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css'],
  standalone: true, 
  imports: [ CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent ], 
})

export class OauthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private oauthService: OAuthService, 
    private userService: UserService,
    private router: Router
  ) {}

  login(): void {
    this.oauthService.login(this.username, this.password).subscribe({
      next: (token) => {
        const email = this.username;
        this.userService.findByEmail(email).subscribe({
          next: (user) => {
            const id = user.id;
            this.router.navigate(['/perfil', id]);
          },
          error: (err) => {
            this.errorMessage = 'Erro ao buscar detalhes do usuário.';
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Falha no login. Verifique suas credenciais.';
      },
    });
  }
}
