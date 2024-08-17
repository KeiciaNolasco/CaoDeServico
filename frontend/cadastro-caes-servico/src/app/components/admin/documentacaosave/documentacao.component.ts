import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { DocumentacaoService } from '../../../services/documentacao.service';
import { CondutorService } from '../../../services/condutor.service';
import { Condutor } from '../../../models/condutor';
import { Documentacao } from '../../../models/documentacao';

@Component({
  selector: 'app-documentacaosaveadmin',
  templateUrl: './documentacao.component.html',
  styleUrls: ['./documentacao.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarAdminComponent, FooterAdminComponent], 
})

export class DocumentacaoSaveAdminComponent implements OnInit {
  id!: number;
  documentacao: Documentacao = {
    cartaTreinamento: null,
    validadeCartaTreinamento: '',
    carteiraVacina: null,
    validadeCarteiraVacina: '',
    certificadoAdestramento: null,
    validadeCertificadoAdestramento: '',
    laudoMedico: null,
    validadeLaudoMedico: '',
    laudoVeterinario: null,
    validadeLaudoVeterinario: '',
    provaAdestramento: null
  }
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 
  cartaTreinamentoFile!: File;
  carteiraVacinaFile!: File;
  certificadoAdestramentoFile!: File;
  laudoMedicoFile!: File;
  laudoVeterinarioFile!: File;
  provaAdestramentoFile!: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentacaoService: DocumentacaoService,
    private condutorService: CondutorService,
    private authService: OAuthService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadDocumentacaoSave();
      this.loadCondutor();
    } else {
      console.error('Documentação não autenticada!');
      this.router.navigate(['/oauth']);
    }
  }

  loadDocumentacaoSave(): void {
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

  onFileSelected(event: any, fileType: string): void {
    const file = event.target.files[0];
    switch (fileType) {
      case 'cartaTreinamento':
        this.cartaTreinamentoFile = file;
        console.log(`Carta de Treinamento selecionada: ${file.name}`);
        break;
      case 'carteiraVacina':
        this.carteiraVacinaFile = file;
        console.log(`Carteira de Vacina selecionada: ${file.name}`);
        break;
      case 'certificadoAdestramento':
        this.certificadoAdestramentoFile = file;
        console.log(`Certificado de Adestramento selecionado: ${file.name}`);
        break;
      case 'laudoMedico':
        this.laudoMedicoFile = file;
        console.log(`Laudo Médico selecionado: ${file.name}`);
        break;
      case 'laudoVeterinario':
        this.laudoVeterinarioFile = file;
        console.log(`Laudo Veterinário selecionado: ${file.name}`);
        break;
      case 'provaAdestramento':
        this.provaAdestramentoFile = file;
        console.log(`Prova de Adestramento selecionada: ${file.name}`);
        break;
      default:
        console.error('Tipo de arquivo não reconhecido:', fileType);
    }
  }  
  
  save(): void {
    const formData: FormData = new FormData();
    if (this.cartaTreinamentoFile) {
      formData.append('cartaTreinamento', this.cartaTreinamentoFile, this.cartaTreinamentoFile.name);
      console.log(`Carta de Treinamento a ser enviada: ${this.cartaTreinamentoFile.name}, Tamanho: ${this.cartaTreinamentoFile.size}`);
    } else {
      console.log("Nenhuma Carta de Treinamento selecionada para envio.");
    }
    const formattedValidadeCartaTreinamento = new Date(this.documentacao.validadeCartaTreinamento).toISOString().split('T')[0];
    formData.append('validadeCartaTreinamento', formattedValidadeCartaTreinamento);
    if (this.carteiraVacinaFile) {
      formData.append('carteiraVacina', this.carteiraVacinaFile, this.carteiraVacinaFile.name);
      console.log(`Carteira de Vacina a ser enviada: ${this.carteiraVacinaFile.name}, Tamanho: ${this.carteiraVacinaFile.size}`);
    } else {
      console.log("Nenhuma Carteira de Vacina selecionada para envio.");
    }
    const formattedValidadeCarteiraVacina = new Date(this.documentacao.validadeCarteiraVacina).toISOString().split('T')[0];
    formData.append('validadeCarteiraVacina', formattedValidadeCarteiraVacina);
    if (this.certificadoAdestramentoFile) {
      formData.append('certificadoAdestramento', this.certificadoAdestramentoFile, this.certificadoAdestramentoFile.name);
      console.log(`Certificado de Adestramento a ser enviado: ${this.certificadoAdestramentoFile.name}, Tamanho: ${this.certificadoAdestramentoFile.size}`);
    } else {
      console.log("Nenhum Certificado de Adestramento selecionado para envio.");
    }
    const formattedValidadeCertificadoAdestramento = new Date(this.documentacao.validadeCertificadoAdestramento).toISOString().split('T')[0];
    formData.append('validadeCertificadoAdestramento', formattedValidadeCertificadoAdestramento);
    if (this.laudoMedicoFile) {
      formData.append('laudoMedico', this.laudoMedicoFile, this.laudoMedicoFile.name);
      console.log(`Laudo Médico a ser enviado: ${this.laudoMedicoFile.name}, Tamanho: ${this.laudoMedicoFile.size}`);
    } else {
      console.log("Nenhum Laudo Médico selecionado para envio.");
    }
    const formattedValidadeLaudoMedico = new Date(this.documentacao.validadeLaudoMedico).toISOString().split('T')[0];
    formData.append('validadeLaudoMedico', formattedValidadeLaudoMedico);
    if (this.laudoVeterinarioFile) {
      formData.append('laudoVeterinario', this.laudoVeterinarioFile, this.laudoVeterinarioFile.name);
      console.log(`Laudo Veterinário a ser enviado: ${this.laudoVeterinarioFile.name}, Tamanho: ${this.laudoVeterinarioFile.size}`);
    } else {
      console.log("Nenhum Laudo Veterinário selecionado para envio.");
    }
    const formattedValidadeLaudoVeterinario = new Date(this.documentacao.validadeLaudoVeterinario).toISOString().split('T')[0];
    formData.append('validadeLaudoVeterinario', formattedValidadeLaudoVeterinario);
    if (this.provaAdestramentoFile) {
      formData.append('provaAdestramento', this.provaAdestramentoFile, this.provaAdestramentoFile.name);
      console.log(`Prova de Adestramento a ser enviada: ${this.provaAdestramentoFile.name}, Tamanho: ${this.provaAdestramentoFile.size}`);
    } else {
      console.log("Nenhuma Prova de Adestramento selecionada para envio.");
    }
    this.documentacaoService.save(this.id, formData).subscribe({
      next: () => {
        console.log("Documentação salva com sucesso.");
        this.router.navigate(['/documentacaoadmin', this.id]);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao salvar a documentação.';
        console.error("Erro ao salvar a documentação:", err);
      }
    });
  }  

  cancel(): void {
    this.router.navigate(['/documentacaoadmin', this.id]);
  }
}