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
    console.log('Salvando usuário:', JSON.stringify(this.user));
    this.userService.save(this.user).subscribe({
      next: (user) => {
        const id = user.id;
        console.log('Usuário salvo com sucesso, ID:', id);
        this.user = { email: '', senha: '' };
          this.confirmSenha = '';
          this.router.navigate(['/condutor', id]);
        },
        error: (err) => {
          console.error('Erro ao salvar o usuário:', err);
        }
      });
    }
  }