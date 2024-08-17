import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { User } from '../../../models/user';
import { Role } from '../../../models/role';
import { OAuthService } from '../../../services/oauth.service';

@Component({
  selector: 'app-usersaveadmin',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarAdminComponent, FooterAdminComponent], 
})

export class UserSaveAdminComponent {
  id!: number;
  user: User = {
    email: '',
    senha: '',
    roles: []
  };
  roles: Role[] = [];
  selectedRole: string = ''; 
  confirmSenha: string = ''; 
  successMessage: string = '';

  constructor(
    private userService: UserService,
    private roleService: RoleService, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: OAuthService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadRoles();
    } else {
      console.error('Usuário não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadRoles(): void {
    this.roleService.findAll().subscribe({
      next: (roles) => this.roles = roles,
      error: (err) => console.error('Erro ao carregar perfis:', err)
    });
  }

  adminSave(): void {
    if (!this.user.senha || this.confirmSenha.trim() === '') {
      console.error('Senha não pode ser vazia');
      return;
    }
    if (this.user.senha !== this.confirmSenha) {
      console.error('As senhas não coincidem.');
      return;
    }
    const selectedRole = this.roles.find(role => role.nome === this.selectedRole);
    if (selectedRole) {
      this.user.roles = [selectedRole];
      this.userService.adminSave(this.user).subscribe({
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
    } else {
      console.error('Role não selecionado ou inválido.');
    }
  }
}