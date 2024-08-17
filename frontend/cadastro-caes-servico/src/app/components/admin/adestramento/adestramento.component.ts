import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { AdestramentoService } from '../../../services/adestramento.service';
import { CondutorService } from '../../../services/condutor.service';
import { Condutor } from '../../../models/condutor';
import { ModalAdminComponent } from '../modal/modal.component';
import { Adestramento } from '../../../models/adestramento';

@Component({
  selector: 'app-adestramentoadmin',
  templateUrl: './adestramento.component.html',
  styleUrls: ['./adestramento.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarAdminComponent, FooterAdminComponent, ModalAdminComponent], 
})

export class AdestramentoAdminComponent implements OnInit {
  id!: number;
  adestramento: Adestramento | undefined; 
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 
  selectedFile!: File;
  showModal: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adestramentoService: AdestramentoService,
    private condutorService: CondutorService,
    private authService: OAuthService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadAdestramento();
      this.loadCondutor();
    } else {
      console.error('Adestramento não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadAdestramento(): void {
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
    this.adestramentoService.findById(this.id).subscribe({
      next: (adestramento: Adestramento) => {
        this.adestramento= adestramento;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o adestramento.';
        console.error(err);
      }
    });
  }  

  update(): void {
    if (this.adestramento) {
      this.router.navigate(['/adestramentoupdateadmin', this.id]);
    } else {
      this.errorMessage = 'Adestramento não encontrado para editar.';
      this.router.navigate(['/adestramentosaveadmin', this.id]);
    }
  }
  
  delete(): void {
    this.showModal = true;
  }

  onConfirmDelete(confirm: boolean): void {
    this.showModal = false;
    if (confirm) {
      this.adestramentoService.delete(this.id).subscribe({
        next: () => {
          this.router.navigate(['/adestramentoadmin', this.id]);
        },
        error: (err) => {
          this.router.navigate(['/adestramentoadmin', this.id]);
        }
      });
    }
  }
}