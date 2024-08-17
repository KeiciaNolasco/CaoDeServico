import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { CondutorService } from '../../../services/condutor.service';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-condutorupdateadmin',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarAdminComponent, FooterAdminComponent], 
})

export class CondutorUpdateAdminComponent implements OnInit {
  id!: number;
  condutor: Condutor = {
    nome: '',
    nascimento: '',
    cpf: '',
    contato: '',
    cid: '',
    foto: null
  }
  selectedFile!: File;
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
      console.error('Condutor não autenticado!');
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
      const formData: FormData = new FormData();
      formData.append('nome', this.condutor.nome);
      const formattedNascimento = new Date(this.condutor.nascimento).toISOString().split('T')[0];
      formData.append('nascimento', formattedNascimento);
      formData.append('cpf', this.condutor.cpf);
      formData.append('contato', this.condutor.contato);
      formData.append('cid', this.condutor.cid);
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile, this.selectedFile.name);
        console.log(`Foto a ser enviada: ${this.selectedFile.name}, Tamanho: ${this.selectedFile.size}`);
      } else {
        console.log("Nenhuma nova foto selecionada para envio.");
      }
      this.condutorService.update(this.id, formData).subscribe({
        next: () => {
          console.log('Condutor atualizado com sucesso!');
          this.router.navigate(['/condutoradmin', this.id]);
        },
        error: (err) => {
          console.error("Erro ao atualizar o condutor:", err);
        }
      });
    } else {
      this.errorMessage = 'Condutor não encontrado.';
    }
  }  
  
  cancel(): void {
    this.router.navigate(['/condutoradmin', this.id]);
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