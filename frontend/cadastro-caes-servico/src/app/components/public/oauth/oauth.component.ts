import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { switchMap } from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css'],
  standalone: true, 
  imports: [ CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent, ModalComponent ], 
})

export class OauthComponent {
  username: string = '';
  password: string = '';
  id: number | null = null; 
  errorMessage: string | null = null;
  showModal: boolean = false; 

  constructor(
    private oauthService: OAuthService, 
    private userService: UserService,
    private router: Router
  ) {}

  login(): void {
    this.oauthService.login(this.username, this.password).pipe(
      switchMap((token) => {
        const email = this.username;
        return this.userService.findByEmail(email);
      })
    ).subscribe({
      next: (user: User) => {
        if (user.id !== undefined && user.id !== null) {
          this.id = user.id;
          const roles = user.roles || [];
          if (roles.some(role => role.nome === 'ADMIN')) {
            this.loginAdmin();
          }
          else if (roles.some(role => role.nome === 'CUSTOMER')) {
            this.router.navigate(['/iniciocustomer', this.id]);
          }
          else {
            this.errorMessage = 'Perfil do usuário não existe.';
          }
        } else {
          this.errorMessage = 'ID do usuário não encontrado.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Falha no login. Verifique suas credenciais.';
      },
    });
  }

  loginAdmin(): void {
    this.showModal = true;
  }

  onConfirmAdmin(confirm: boolean): void {
    this.showModal = false;
    if (confirm) {
      this.router.navigate(['/inicioadmin', this.id]);
    } else {
      this.router.navigate(['/iniciocustomer', this.id]);
    }
  }
}