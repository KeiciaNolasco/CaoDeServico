import { Component, OnInit } from '@angular/core';
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
  selector: 'app-caoupdate',
  templateUrl: './cao.component.html',
  styleUrls: ['./cao.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent], 
})

export class CaoUpdateComponent implements OnInit {
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
    private authService: OAuthService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadCaoUpdate();
      this.loadCondutor();
    } else {
      console.error('Cão de Serviço não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadCaoUpdate(): void {
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  findById(id: number): void {
    this.caoService.findById(this.id).subscribe({
      next: (cao) => {
        if (cao.nascimento) {
          const formattedNascimento = new Date(cao.nascimento).toISOString().split('T')[0];
          this.cao = { ...cao, nascimento: formattedNascimento };
        }
        if (this.cao) {
          if (this.cao.foto) {
            if (typeof this.cao.foto === 'string') {
              this.cao.foto = cao.foto;
            } else if (this.cao.foto instanceof ArrayBuffer) {
              this.cao.foto = this.arrayBufferToBase64(new Uint8Array(this.cao.foto));
            }
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar o cão de serviço:', error);
      }
    });
  }  

  update(): void {
    if (this.cao) {
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
        console.log("Nenhuma nova foto selecionada para envio.");
      }
      this.caoService.update(this.id, formData).subscribe({
        next: () => {
          console.log('Cão de Serviço atualizado com sucesso!');
          this.router.navigate(['/caocustomer', this.id]);
        },
        error: (err) => {
          console.error("Erro ao atualizar o cão de serviço:", err);
        }
      });
    } else {
      this.errorMessage = 'Cão de Serviço não encontrado.';
    }
  }  

  cancel(): void {
    this.router.navigate(['/caocustomer', this.id]);
  }

  private arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}