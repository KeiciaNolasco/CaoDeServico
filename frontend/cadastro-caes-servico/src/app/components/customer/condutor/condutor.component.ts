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
  selector: 'app-condutorcustomer',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent], 
})

export class CondutorCustomerComponent implements OnInit {
  id!: number;
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 
  selectedFile!: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private condutorService: CondutorService,
    private authService: OAuthService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadCondutor();
    } else {
      console.error('Usuário não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadCondutor(): void {
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  findById(id: number): void {
    this.condutorService.findById(this.id).subscribe({
      next: (condutor) => {
        if (condutor.nascimento) {
          const formattedNascimento = new Date(condutor.nascimento).toISOString().split('T')[0];
          this.condutor = { ...condutor, nascimento: formattedNascimento };
        }
  
        if (this.condutor) {
          if (this.condutor.foto) {
            if (typeof this.condutor.foto === 'string') {
              this.condutor.foto = condutor.foto;
            } else if (this.condutor.foto instanceof ArrayBuffer) {
              this.condutor.foto = this.arrayBufferToBase64(new Uint8Array(this.condutor.foto));
            }
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar o condutor:', error);
      }
    });
  }  

  update(): void {
    if (this.condutor) {
      this.router.navigate(['/condutorupdate', this.id]);
    } else {
      this.errorMessage = 'Condutor não encontrado para editar.';
      this.router.navigate(['/condutorsave', this.id]);
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