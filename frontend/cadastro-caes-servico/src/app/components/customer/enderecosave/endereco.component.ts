import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarCustomerComponent } from '../navbar/navbar.component'; 
import { FooterCustomerComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { EnderecoService } from '../../../services/endereco.service';
import { CondutorService } from '../../../services/condutor.service';
import { Endereco } from '../../../models/endereco';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-enderecosave',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent], 
})

export class EnderecoSaveComponent implements OnInit {
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
  selectedFile!: File;

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
      this.loadEnderecoSave();
      this.loadCondutor();
    } else {
      console.error('Endereço não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadEnderecoSave(): void {
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

  save(): void {
    this.enderecoService.save(this.id, this.endereco).subscribe({
      next: () => {
        console.log("Endereço salvo com sucesso.");
        this.router.navigate(['/enderecocustomer', this.id]);
      },
      error: (err) => {
        console.error("Erro ao salvar o endereço:", err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/enderecocustomer', this.id]);
  } 
}