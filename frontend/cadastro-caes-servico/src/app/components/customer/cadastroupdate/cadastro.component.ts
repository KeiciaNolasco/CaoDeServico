import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import { CarteiraCustomerComponent } from '../carteira/carteira.component';

@Component({
  selector: 'app-cadastroupdate',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true, 
  imports: [NavbarCustomerComponent, FooterCustomerComponent, CarteiraCustomerComponent, RouterModule, CommonModule],
})
export class CadastroUpdateComponent implements OnInit {
  id!: number;
  perfil: any;
  condutor: Condutor | undefined; 
  cadastro: Cadastro | undefined; 
  errorMessage: string | null = null; 
  successMessage: string | null = null; 
  isCadastroSubmitted: boolean = false;
  isCadastroFound: boolean = false;
  rejectionReason: string | null = null;
  isCadastroVerified: boolean = false;

  @ViewChild(CarteiraCustomerComponent) carteiraCustomerComponent!: CarteiraCustomerComponent;

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
      this.checkCadastroSubmission();
      this.loadCadastro(); 
      this.loadCondutor();
      this.checkRejectionReason();
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
          this.isCadastroFound = true; 
        } else {
          this.isCadastroFound = false;
        }
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o cadastro.';
        console.error(err);
        this.isCadastroFound = false;
      }
    });
  }  

  submitCadastro(): void {
    localStorage.removeItem(`rejectionReason_${this.id}`);
    this.rejectionReason = null;
    this.successMessage = 'Seu cadastro foi enviado com sucesso para verificação. Aguarde a aprovação.';
    const pendingSolicitations = JSON.parse(localStorage.getItem('pendingSolicitations') || '[]');
    if (!pendingSolicitations.includes(this.id)) {
      pendingSolicitations.push(this.id);
      localStorage.setItem('pendingSolicitations', JSON.stringify(pendingSolicitations));
    }
    setTimeout(() => {
      this.isCadastroSubmitted = true; 
      this.successMessage = null; 
      localStorage.setItem(`isCadastroSubmitted_${this.id}`, 'true');
    }, 2000);
  }
  
  checkCadastroSubmission(): void {
    const submissionStatus = localStorage.getItem(`isCadastroSubmitted_${this.id}`);
    const verificationStatus = localStorage.getItem(`isCadastroVerified_${this.id}`);
    if (submissionStatus === 'true') {
      this.isCadastroSubmitted = true;
      this.isCadastroVerified = verificationStatus === 'true';
    } else {
      this.isCadastroSubmitted = false;
      this.isCadastroVerified = verificationStatus === 'false';
    }
  }  

  checkRejectionReason(): void {
    this.rejectionReason = localStorage.getItem(`rejectionReason_${this.id}`);
  }  

  downloadCarteiraPDF(): void {
    if (this.carteiraCustomerComponent) {
      this.carteiraCustomerComponent.downloadPDF();
    } else {
      console.error('Componente CarteiraCustomerComponent não foi carregado corretamente.');
    }
  }
}