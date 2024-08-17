import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { CondutorService } from '../../../services/condutor.service';
import { User } from '../../../models/user';
import { Role } from '../../../models/role';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-userupdateadmin',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarAdminComponent, FooterAdminComponent], 
})

export class UserUpdateAdminComponent implements OnInit {
  id!: number;
  user: User = { 
    email: '', 
    senha: '',
    roles: []
  }; 
  roles: Role[] = [];
  selectedRole: string = ''; 
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 

  constructor(
    private userService: UserService,
    private roleService: RoleService, 
    private condutorService: CondutorService,
    private authService: OAuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadUserUpdate();
      this.loadRoles();
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

  loadRoles(): void {
    this.roleService.findAll().subscribe({
      next: (roles) => this.roles = roles,
      error: (err) => console.error('Erro ao carregar perfis:', err)
    });
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
      next: (user: User) => {
        this.user = user;
        if (this.user.roles && this.user.roles.length > 0) {
          this.selectedRole = this.user.roles.map(role => role.nome).join(', ');
        } else {
          console.log('Nenhum role associado ao usuário.');
        }
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o usuário.';
        console.error(err);
      }
    });
  }
  
  adminUpdate(): void {
    const selectedRole = this.roles.find(role => role.nome === this.selectedRole);
    if (selectedRole) {
      this.user.roles = [selectedRole];
      this.userService.adminUpdate(this.id, this.user).subscribe({
        next: () => {
          console.log('Usuário atualizado com sucesso!');
          this.router.navigate(['/useradmin', this.id]);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao atualizar o usuário.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Role não selecionado ou inválido.';
    }
  }

  cancel(): void {
    this.router.navigate(['/useradmin', this.id]);
  }
}