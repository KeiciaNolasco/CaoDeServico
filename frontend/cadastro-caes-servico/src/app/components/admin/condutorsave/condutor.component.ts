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
  selector: 'app-condutorsaveadmin',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarAdminComponent, FooterAdminComponent], 
})

export class CondutorSaveAdminComponent implements OnInit {
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
      this.loadCondutorSave();
    } else {
      console.error('Condutor não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadCondutorSave(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
      } catch (error) {
        console.error('Erro ao decodificar o token JWT', error);
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  
  save(): void {
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
      console.log("Nenhuma foto selecionada para envio.");
    }
    this.condutorService.save(this.id, formData).subscribe({
      next: () => {
        console.log("Condutor salvo com sucesso.");
        this.router.navigate(['/condutoradmin', this.id]);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao salvar o condutor.';
        console.error("Erro ao salvar o condutor:", err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/condutoradmin', this.id]);
  }
}
