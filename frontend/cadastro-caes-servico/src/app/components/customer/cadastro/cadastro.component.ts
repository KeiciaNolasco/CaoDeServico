import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-cadastrocustomer',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true, 
  imports: [NavbarCustomerComponent, FooterCustomerComponent, RouterModule, CommonModule],
})
export class CadastroCustomerComponent implements OnInit {
  id!: number;
  perfil: any;
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 
  successMessage: string | null = null; 
  isCadastroSubmitted: boolean = false;

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
    } else {
      console.error('Cadastro não autenticado!');
    }
  }

  loadCadastro(): void {
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

  submitCadastro(): void {
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
    if (submissionStatus === 'true') {
      this.isCadastroSubmitted = true;
    } else {
      this.isCadastroSubmitted = false;
    }
  }  
}