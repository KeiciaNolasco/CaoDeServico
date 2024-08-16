import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarCustomerComponent } from '../navbar/navbar.component'; 
import { FooterCustomerComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { CondutorService } from '../../../services/condutor.service';
import { CaoService } from '../../../services/cao.service';
import { EnderecoService } from '../../../services/endereco.service';
import { User } from '../../../models/user';
import { Role } from '../../../models/role';
import { Condutor } from '../../../models/condutor';
import { Cao } from '../../../models/cao';
import { Endereco } from '../../../models/endereco';
import { ModalCustomerComponent } from '../modal/modal.component';

@Component({
  selector: 'app-usercustomer',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent, ModalCustomerComponent], 
})

export class UserCustomerComponent implements OnInit {
  id!: number;
  user: User | undefined;
  role: Role | undefined;
  condutor: Condutor | undefined; 
  cao: Cao | undefined; 
  endereco: Endereco | undefined; 
  errorMessage: string | null = null; 
  showModal: boolean = false; 

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private condutorService: CondutorService,
    private caoService: CaoService,
    private enderecoService: EnderecoService,
    private authService: OAuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadUser();
      this.loadCondutor();
      this.loadCao();
      this.loadEndereco();
    } else {
      console.error('Usuário não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadUser(): void {
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

  loadCao(): void {
    this.caoService.findById(this.id).subscribe({
      next: (cao: Cao) => {
        this.cao= cao;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o cão de serviço.';
        console.error(err);
      }
    });
  }

  loadEndereco(): void {
    this.enderecoService.findById(this.id).subscribe({
      next: (endereco: Endereco) => {
        this.endereco= endereco;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o endereço.';
        console.error(err);
      }
    });
  }

  findById(id: number): void {
    this.userService.findById(this.id).subscribe({
      next: (user : User) => {
        this.user = user
        const nomes = user.roles?.map(role => role.nome); 
        if (nomes) {
          nomes.forEach(nome => {
            this.roleService.findByNome(nome).subscribe({
              next: (role: Role) => {
                this.role = role
              },
            });
          });
        }
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o usuário.';
        console.error(err);
      }
    });
  }

  update(): void {
    if (this.user) {
      this.router.navigate(['/userupdate', this.id]);
    } else {
      this.errorMessage = 'Usuário não encontrado para editar.';
    }
  }
  
  delete(): void {
    this.showModal = true;
  }

  onConfirmDelete(confirm: boolean): void {
    this.showModal = false;
    if (confirm) {
      this.userService.delete(this.id).subscribe({
        next: () => {
          if (this.condutor !== null) {
            this.condutorService.delete(this.id).subscribe({
            });
          }
          if (this.cao !== null) {
            this.caoService.delete(this.id).subscribe({
            });
          }
          if (this.endereco !== null) {
            this.enderecoService.delete(this.id).subscribe({
            });
          }
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          console.error('Erro ao deletar o usuário:', err);
          this.router.navigate(['/usercustomer', this.id]);
        }
      });
    }
  }
}