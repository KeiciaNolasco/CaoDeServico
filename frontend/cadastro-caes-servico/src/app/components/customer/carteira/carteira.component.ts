import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { NavbarCustomerComponent } from '../navbar/navbar.component'; 
import { FooterCustomerComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { CondutorService } from '../../../services/condutor.service';
import { CaoService } from '../../../services/cao.service';
import { AdestramentoService } from '../../../services/adestramento.service';
import { DocumentacaoService } from '../../../services/documentacao.service';
import { jwtDecode } from 'jwt-decode';
import { Condutor } from '../../../models/condutor';
import { Cao } from '../../../models/cao';
import { Adestramento } from '../../../models/adestramento';
import { Documentacao } from '../../../models/documentacao';

@Component({
  selector: 'app-carteiracustomer',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css'],
  standalone: true, 
  imports: [NavbarCustomerComponent, FooterCustomerComponent, RouterModule, CommonModule],
})
export class CarteiraCustomerComponent implements OnInit {
  id!: number;
  perfil: any;
  condutor: Condutor | undefined; 
  cao: Cao | undefined; 
  adestramento: Adestramento | undefined; 
  documentacao: Documentacao | undefined; 
  errorMessage: string | null = null; 
  successMessage: string | null = null; 

  constructor(
    private condutorService: CondutorService,
    private caoService: CaoService,
    private adestramentoService: AdestramentoService,
    private documentacaoService: DocumentacaoService,
    private authService: OAuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadCarteira(); 
      this.loadCondutor();
      this.loadCao();
      this.loadAdestramento();
      this.loadDocumentacao();
    } else {
      console.error('Carteira não autenticada!');
    }
  }

  loadCarteira(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
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
        this.cao = cao;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o cão de serviço.';
        console.error(err);
      }
    });
  }

  loadAdestramento(): void {
    this.adestramentoService.findById(this.id).subscribe({
      next: (adestramento: Adestramento) => {
        this.adestramento = adestramento;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o adestramento.';
        console.error(err);
      }
    });
  }

  loadDocumentacao(): void {
    this.documentacaoService.findById(this.id).subscribe({
      next: (documentacao: Documentacao) => {
        this.documentacao = documentacao;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar a documentação.';
        console.error(err);
      }
    });
  }
}