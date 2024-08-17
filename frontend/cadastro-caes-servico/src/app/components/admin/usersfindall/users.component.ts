import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { CondutorService } from '../../../services/condutor.service';
import { CaoService } from '../../../services/cao.service';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../models/user';
import { Role } from '../../../models/role';
import { Condutor } from '../../../models/condutor';
import { Cao } from '../../../models/cao';

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
  caes: Cao[] = [];
  errorMessage: string = ''; 

  constructor(
    private authService: OAuthService,
    private userService: UserService,
    private roleService: RoleService,
    private condutorService: CondutorService,
    private caoService: CaoService,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadUsersFindAll();
      this.loadRoles();
      this.loadCondutores();
      this.loadCaes();
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

  loadCaes(): void {
    this.caoService.findAll().subscribe({
      next: (caes) => {
        this.caes = caes;
        this.associateCaesWithUsers();
      },
      error: (err) => console.error('Erro ao carregar cães de serviço:', err)
    });
  }

  findAllUsers(): void {
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users = users;
        this.associateCondutoresWithUsers();
        this.associateCaesWithUsers();
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

  associateCaesWithUsers(): void {
    if (this.users.length && this.caes.length) {
      this.users.forEach(user => {
        const cao = this.caes.find(c => c.id === user.id);
        if (cao) {
          (user as any).cao = cao;
        }
      });
    }
  }

  getCondutorNome(user: User): string {
    return (user as any).condutor?.nome || 'Condutor não encontrado';
  }

  getCaoNome(user: User): string {
    return (user as any).cao?.nome || 'Cão não encontrado';
  }

  update(userId: number): void {
    this.router.navigate(['/userupdateadmin', userId]);
  }
}
