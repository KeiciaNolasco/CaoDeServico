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
import { ModalCustomerComponent } from '../modal/modal.component';

@Component({
  selector: 'app-caocustomer',
  templateUrl: './cao.component.html',
  styleUrls: ['./cao.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent, ModalCustomerComponent], 
})

export class CaoCustomerComponent implements OnInit {
  id!: number;
  cao: Cao| undefined; 
  categorias = Object.values(Categoria);
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 
  selectedFile!: File;
  showModal: boolean = false; 

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
      this.loadCao();
      this.loadCondutor();
    } else {
      console.error('Cão de Serviço não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadCao(): void {
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
      this.router.navigate(['/caoupdate', this.id]);
    } else {
      this.errorMessage = 'Cão de Serviço não encontrado para editar.';
      this.router.navigate(['/caosave', this.id]);
    }
  }
  
  delete(): void {
    this.showModal = true;
  }

  onConfirmDelete(confirm: boolean): void {
    this.showModal = false;
    if (confirm) {
      this.caoService.delete(this.id).subscribe({
        next: () => {
          this.router.navigate(['/caocustomer', this.id]);
        },
        error: (err) => {
          this.router.navigate(['/caocustomer', this.id]);
        }
      });
    }
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