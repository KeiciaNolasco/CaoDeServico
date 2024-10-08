import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { NavbarCustomerComponent } from '../navbar/navbar.component'; 
import { FooterCustomerComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { CadastroService } from '../../../services/cadastro.service';
import { CondutorService } from '../../../services/condutor.service';
import { jwtDecode } from 'jwt-decode';
import { Cadastro } from '../../../models/cadastro';
import { Condutor } from '../../../models/condutor';
import { CadastroSaveComponent } from '../cadastrosave/cadastro.component';
import { CadastroUpdateComponent } from '../cadastroupdate/cadastro.component';

@Component({
  selector: 'app-cadastrocustomer',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true, 
  imports: [NavbarCustomerComponent, FooterCustomerComponent, CadastroSaveComponent, CadastroUpdateComponent, RouterModule, CommonModule],
})
export class CadastroCustomerComponent implements OnInit {
  id!: number;
  perfil: any;
  condutor: Condutor | undefined; 
  cadastro: Cadastro | undefined; 
  errorMessage: string | null = null; 
  successMessage: string | null = null; 
  showCadastroSave: boolean = false;
  showCadastroUpdate: boolean = false;

  @ViewChild(CadastroSaveComponent) cadastrosaveComponent!: CadastroSaveComponent;

  constructor(
    private authService: OAuthService,
    private cadastroService: CadastroService,
    private condutorService: CondutorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadCadastro(); 
      this.loadCondutor();
    } else {
      console.error('Cadastro não autenticado!');
    }
  }

  loadCadastro(): void {
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
    this.cadastroService.findById(this.id).subscribe({
      next: (cadastro: Cadastro) => {
        if (cadastro) {
          this.cadastro = cadastro;
          this.showCadastroUpdate = true; 
        } else {
          this.showCadastroSave = true; 
        }
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o cadastro.';
        console.error(err);
        this.showCadastroSave = true;
      }
    });
  }  
}