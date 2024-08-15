import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent], 
})

export class UserComponent {
  user: User = {
    email: '',
    senha: '',
  };
  confirmSenha: string = ''; 
  successMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  save(): void {
    if (!this.user.senha || this.confirmSenha.trim() === '') {
      console.error('Senha não pode ser vazia');
      return;
    }
    if (this.user.senha !== this.confirmSenha) {
      console.error('As senhas não coincidem.');
      return;
    }
    this.userService.save(this.user).subscribe({
      next: () => {
        this.successMessage = 'Usuário salvo com sucesso!'; 
        setTimeout(() => {
          this.router.navigate(['/oauth']); 
        }, 2000);
      },
      error: (err) => {
        console.error('Erro ao salvar o usuário:', err);
      }
    });
  }
}