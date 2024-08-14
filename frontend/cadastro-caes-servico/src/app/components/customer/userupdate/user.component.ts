import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarCustomerComponent } from '../navbar/navbar.component'; 
import { FooterCustomerComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../services/user.service';
import { CondutorService } from '../../../services/condutor.service';
import { User } from '../../../models/user';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-userupdate',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent], 
})

export class UserUpdateComponent implements OnInit {
  id!: number;
  user: User = { email: '', senha: '' }; 
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 

  constructor(
    private userService: UserService,
    private condutorService: CondutorService,
    private authService: OAuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadUserUpdate();
      this.loadCondutor();
    } else {
      console.error('Usuário não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadUserUpdate(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.findById(this.id);
      } catch (error) {
        console.error('Erro ao decodificar o token JWT', error);
      }
    }
  }

  loadCondutor(): void {
    this.condutorService.findById(this.id).subscribe({
      next: (condutor: Condutor) => {
        this.condutor = condutor;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o condutor.';
        console.error(err);
      }
    });
  }

  findById(id: number): void {
    this.userService.findById(this.id).subscribe({
      next: (user : User) => {
        this.user = user
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o usuário.';
        console.error(err);
      }
    });
  }

  update(): void {
    if (this.user) {
      this.userService.update(this.id, this.user).subscribe({
        next: () => {
          console.log('Usuário atualizado com sucesso!');
          this.router.navigate(['/usercustomer', this.id]);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao atualizar o usuário.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Usuário não encontrado.';
    }
  }

  cancel(): void {
    this.router.navigate(['/usercustomer', this.id]);
  }
}