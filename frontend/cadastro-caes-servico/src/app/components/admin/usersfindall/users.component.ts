import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { CondutorService } from '../../../services/condutor.service';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../models/user';
import { Role } from '../../../models/role';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-usersfindalladmin',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true, 
  imports: [NavbarAdminComponent, FooterAdminComponent, RouterModule, CommonModule],
})
export class UsersFindAllAdminComponent implements OnInit {
  id!: number;
  users: User[] = [];
  roles: Role[] = [];
  condutores: Condutor[] = [];
  errorMessage: string = ''; 

  constructor(
    private authService: OAuthService,
    private userService: UserService,
    private roleService: RoleService,
    private condutorService: CondutorService,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadUsersFindAll();
      this.loadRoles();
      this.loadCondutores();
    } else {
      console.error('Usuário não autenticado!');
    }
  }

  loadUsersFindAll(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.findAllUsers();
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

  loadCondutores(): void {
    this.condutorService.findAll().subscribe({
      next: (condutores) => {
        this.condutores = condutores;
        this.associateCondutoresWithUsers();
      },
      error: (err) => console.error('Erro ao carregar condutores:', err)
    });
  }

  findAllUsers(): void {
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users = users;
        this.associateCondutoresWithUsers();
      },
      error: (error) => console.error('Erro ao carregar os usuários', error)
    });
  }

  associateCondutoresWithUsers(): void {
    if (this.users.length && this.condutores.length) {
      this.users.forEach(user => {
        const condutor = this.condutores.find(c => c.id === user.id);
        if (condutor) {
          (user as any).condutor = condutor;
        }
      });
    }
  }

  getCondutorNome(user: User): string {
    return (user as any).condutor?.nome || 'Condutor não encontrado';
  }

  update(userId: number): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/userupdateadmincustomer', userId])
    );
    window.open(url, '_blank');
  }  
}
