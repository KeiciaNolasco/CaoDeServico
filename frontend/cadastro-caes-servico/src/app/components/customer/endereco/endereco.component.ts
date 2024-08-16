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
import { Condutor } from '../../../models/condutor';
import { ModalCustomerComponent } from '../modal/modal.component';
import { Endereco } from '../../../models/endereco';

@Component({
  selector: 'app-enderecocustomer',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent, ModalCustomerComponent], 
})

export class EnderecoCustomerComponent implements OnInit {
  id!: number;
  endereco: Endereco | undefined; 
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 
  selectedFile!: File;
  showModal: boolean = false; 

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
      this.loadEndereco();
      this.loadCondutor();
    } else {
      console.error('Endereço não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadEndereco(): void {
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

  update(): void {
    if (this.endereco) {
      this.router.navigate(['/enderecoupdate', this.id]);
    } else {
      this.errorMessage = 'Endereço não encontrado para editar.';
      this.router.navigate(['/enderecosave', this.id]);
    }
  }
  
  delete(): void {
    this.showModal = true;
  }

  onConfirmDelete(confirm: boolean): void {
    this.showModal = false;
    if (confirm) {
      this.enderecoService.delete(this.id).subscribe({
        next: () => {
          this.router.navigate(['/enderecocustomer', this.id]);
        },
        error: (err) => {
          this.router.navigate(['/enderecocustomer', this.id]);
        }
      });
    }
  }
}