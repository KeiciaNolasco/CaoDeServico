import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { DocumentacaoService } from '../../../services/documentacao.service';
import { CondutorService } from '../../../services/condutor.service';
import { Condutor } from '../../../models/condutor';
import { ModalAdminComponent } from '../modal/modal.component';
import { Documentacao } from '../../../models/documentacao';

@Component({
  selector: 'app-documentacaoadmin',
  templateUrl: './documentacao.component.html',
  styleUrls: ['./documentacao.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarAdminComponent, FooterAdminComponent, ModalAdminComponent], 
})

export class DocumentacaoAdminComponent implements OnInit {
  id!: number;
  documentacao: Documentacao | undefined;  
  condutor: Condutor | undefined; 
  pdfUrl: SafeResourceUrl | undefined;
  errorMessage: string | null = null; 
  showModal: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentacaoService: DocumentacaoService,
    private condutorService: CondutorService,
    private authService: OAuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadDocumentacao();
      this.loadCondutor();
    } else {
      console.error('Documentação não autenticada!');
      this.router.navigate(['/oauth']);
    }
  }

  loadDocumentacao(): void {
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

  loadPdf(fileType: string): void {
    this.documentacaoService.downloadFile(this.id, fileType).subscribe({
      next: (pdfBlob) => {
        const url = window.URL.createObjectURL(pdfBlob);
        const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  
        if (this.documentacao) {
          switch (fileType) {
            case 'cartaTreinamento':
              this.documentacao.cartaTreinamento = sanitizedUrl;
              break;
            case 'carteiraVacina':
              this.documentacao.carteiraVacina = sanitizedUrl;
              break;
            case 'certificadoAdestramento':
              this.documentacao.certificadoAdestramento = sanitizedUrl;
              break;
            case 'laudoMedico':
              this.documentacao.laudoMedico = sanitizedUrl;
              break;
            case 'laudoVeterinario':
              this.documentacao.laudoVeterinario = sanitizedUrl;
              break;
            case 'provaAdestramento':
              this.documentacao.provaAdestramento = sanitizedUrl;
              break;
          }
        }
      },
      error: (error) => {
        console.error(`Erro ao carregar o PDF (${fileType}):`, error);
      }
    });
  }  

  findById(id: number): void {
    this.documentacaoService.findById(this.id).subscribe({
      next: (documentacao) => {
        if (documentacao) {
          this.documentacao = {
            cartaTreinamento: 'Nenhum arquivo disponível',
            validadeCartaTreinamento: documentacao.validadeCartaTreinamento 
              ? new Date(documentacao.validadeCartaTreinamento).toISOString().split('T')[0] 
              : '',
            carteiraVacina: 'Nenhum arquivo disponível',
            validadeCarteiraVacina: documentacao.validadeCarteiraVacina 
              ? new Date(documentacao.validadeCarteiraVacina).toISOString().split('T')[0] 
              : '',
            certificadoAdestramento: 'Nenhum arquivo disponível',
            validadeCertificadoAdestramento: documentacao.validadeCertificadoAdestramento 
              ? new Date(documentacao.validadeCertificadoAdestramento).toISOString().split('T')[0] 
              : '',
            laudoMedico: 'Nenhum arquivo disponível',
            validadeLaudoMedico: documentacao.validadeLaudoMedico 
              ? new Date(documentacao.validadeLaudoMedico).toISOString().split('T')[0] 
              : '',
            laudoVeterinario: 'Nenhum arquivo disponível',
            validadeLaudoVeterinario: documentacao.validadeLaudoVeterinario 
              ? new Date(documentacao.validadeLaudoVeterinario).toISOString().split('T')[0] 
              : '',
            provaAdestramento: 'Nenhum arquivo disponível'
          };
          this.loadPdf('cartaTreinamento');
          this.loadPdf('carteiraVacina');
          this.loadPdf('certificadoAdestramento');
          this.loadPdf('laudoMedico');
          this.loadPdf('laudoVeterinario');
          this.loadPdf('provaAdestramento');
        }
      },
      error: (error) => {
        console.error('Erro ao carregar a documentação:', error);
      }
    });
  }  
  
  update(): void {
    if (this.documentacao) {
      this.router.navigate(['/documentacaoupdateadmin', this.id]);
    } else {
      this.errorMessage = 'Documentação não encontrada para editar.';
      this.router.navigate(['/documentacaosaveadmin', this.id]);
    }
  }
  
  delete(): void {
    this.showModal = true;
  }

  onConfirmDelete(confirm: boolean): void {
    this.showModal = false;
    if (confirm) {
      this.documentacaoService.delete(this.id).subscribe({
        next: () => {
          this.router.navigate(['/documentacaoadmin', this.id]);
        },
        error: (err) => {
          this.router.navigate(['/documentacaoadmin', this.id]);
        }
      });
    }
  }
}