import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarCustomerComponent } from '../navbar/navbar.component'; 
import { FooterCustomerComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { CondutorService } from '../../../services/condutor.service';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-condutorupdate',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent], 
})

export class CondutorUpdateComponent implements OnInit {
  id!: number;
  condutor: Condutor = {
    nome: '',
    nascimento: '',
    cpf: '',
    contato: '',
    cid: '',
    foto: null
  }
  errorMessage: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private condutorService: CondutorService,
    private authService: OAuthService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadCondutorUpdate();
    } else {
      console.error('Usuário não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadCondutorUpdate(): void {
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

  findById(id: number): void {
    this.condutorService.findById(this.id).subscribe({
      next: (condutor: Condutor) => {
        this.condutor = condutor
      },
      error: (err) => {
        this.errorMessage = 'Condutor ainda não existe.';
        console.error(err);
      }
    });
  }

  update(): void {
    if (this.condutor) {
      this.router.navigate(['/condutorupdate', this.id]);
    } else {
      this.errorMessage = 'Condutor não encontrado para editar.';
    }
  }
  
  delete(): void {
    if (this.condutor && confirm('Tem certeza que deseja deletar o Condutor?')) {
      this.condutorService.delete(this.id).subscribe({
        next: () => {
          console.log('Condutor deletado com sucesso!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao deletar o condutor.';
          console.error(err);
        }
      });
    }
  }
}