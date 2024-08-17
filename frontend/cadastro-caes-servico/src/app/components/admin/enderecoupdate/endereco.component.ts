import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { EnderecoService } from '../../../services/endereco.service';
import { CondutorService } from '../../../services/condutor.service';
import { Endereco } from '../../../models/endereco';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-enderecoupdateadmin',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarAdminComponent, FooterAdminComponent], 
})

export class EnderecoUpdateAdminComponent implements OnInit {
  id!: number;
  endereco: Endereco = {
    pais: '',
    estado: '',
    cep: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: ''
  }
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enderecoService: EnderecoService,
    private condutorService: CondutorService,
    private authService: OAuthService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadEnderecoUpdate();
      this.loadCondutor();
    } else {
      console.error('Endereço não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadEnderecoUpdate(): void {
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
    this.enderecoService.findById(this.id).subscribe({
      next: (endereco : Endereco) => {
        this.endereco = endereco
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o endereço.';
        console.error(err);
      }
    });
  }

  update(): void {
    if (this.endereco) {
      this.enderecoService.update(this.id, this.endereco).subscribe({
        next: () => {
          console.log('Endereço atualizado com sucesso!');
          this.router.navigate(['/enderecoadmin', this.id]);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao atualizar o endereço.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Endereço não encontrado.';
    }
  }

  cancel(): void {
    this.router.navigate(['/enderecoadmin', this.id]);
  } 
}