import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true, 
  imports: [NavbarComponent, FooterComponent, RouterModule, FormsModule],
})

export class UserComponent {
  users: User[] = [];
  newUser: User = { email: '', senha: '' }; 
  confirmSenha: string = ''; 

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.findAll().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Erro ao carregar usuários', error);
      }
    );
  }

  onSubmit(): void {
    this.router.navigate(['/condutor']);
  }

  save(): void {
    if (this.newUser.senha !== this.confirmSenha) {
      alert('A senha e a confirmação de senha não coincidem.');
      return;
    }

    this.userService.save(this.newUser).subscribe(
      (data: User) => {
        this.users.push(data); 
        this.newUser = { email: '', senha: '' }; 
        this.confirmSenha = ''; 
        console.log('Usuário criado com sucesso!');
      },
      (error) => {
        console.error('Erro ao criar usuário', error);
      }
    );
  }

}