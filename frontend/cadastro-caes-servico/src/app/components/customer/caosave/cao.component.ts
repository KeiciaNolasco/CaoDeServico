import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarCustomerComponent } from '../navbar/navbar.component'; 
import { FooterCustomerComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { CaoService } from '../../../services/cao.service';
import { CondutorService } from '../../../services/condutor.service';
import { Cao } from '../../../models/cao';
import { Categoria } from '../../../models/categoria';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-caosave',
  templateUrl: './cao.component.html',
  styleUrls: ['./cao.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent], 
})

export class CaoSaveComponent implements OnInit {
  id!: number;
  cao: Cao = {
    nome: '',
    nascimento: '',
    raca: '',
    microchip: '',
    categoria: null,
    foto: null
  }
  categorias = Object.values(Categoria);
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 
  selectedFile!: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caoService: CaoService,
    private condutorService: CondutorService,
    private authService: OAuthService,
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadCaoSave();
      this.loadCondutor();
    } else {
      console.error('Cão de Serviço não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadCaoSave(): void {
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  save(): void {
    const formData: FormData = new FormData();
    formData.append('nome', this.cao.nome);
    const formattedNascimento = new Date(this.cao.nascimento).toISOString().split('T')[0];
    formData.append('nascimento', formattedNascimento);
    formData.append('raca', this.cao.raca);
    formData.append('microchip', this.cao.microchip);
    if (this.cao.categoria !== null) {
      formData.append('categoria', this.cao.categoria);
    } else {
      console.error('Categoria não pode ser null');
    }
    if (this.selectedFile) {
      formData.append('foto', this.selectedFile, this.selectedFile.name);
      console.log(`Foto a ser enviada: ${this.selectedFile.name}, Tamanho: ${this.selectedFile.size}`);
    } else {
      console.log("Nenhuma foto selecionada para envio.");
    }
    this.caoService.save(this.id, formData).subscribe({
      next: () => {
        console.log("Cão de Serviço salvo com sucesso.");
        this.router.navigate(['/caocustomer', this.id]);
      },
      error: (err) => {
        console.error("Erro ao salvar o cão de serviço:", err);
      }
    });
  }
  
  cancel(): void {
    this.router.navigate(['/caocustomer', this.id]);
  }
}