import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NavbarCustomerComponent } from '../navbar/navbar.component'; 
import { FooterCustomerComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { CondutorService } from '../../../services/condutor.service';
import { CaoService } from '../../../services/cao.service';
import { AdestramentoService } from '../../../services/adestramento.service';
import { DocumentacaoService } from '../../../services/documentacao.service';
import { jwtDecode } from 'jwt-decode';
import { Condutor } from '../../../models/condutor';
import { Cao } from '../../../models/cao';
import { Adestramento } from '../../../models/adestramento';
import { Documentacao } from '../../../models/documentacao';

@Component({
  selector: 'app-carteiracustomer',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.css'],
  standalone: true, 
  imports: [NavbarCustomerComponent, FooterCustomerComponent, RouterModule, CommonModule],
})

export class CarteiraCustomerComponent implements OnInit {
  id!: number;
  qrCodeUrl!: SafeUrl;
  condutor: Condutor | undefined; 
  cao: Cao | undefined; 
  adestramento: Adestramento | undefined; 
  documentacao: Documentacao | undefined; 
  errorMessage: string | null = null; 
  successMessage: string | null = null; 

  @ViewChild('identificacaoContainer', { static: false }) identificacaoContainer!: ElementRef;

  constructor(
    private condutorService: CondutorService,
    private caoService: CaoService,
    private adestramentoService: AdestramentoService,
    private documentacaoService: DocumentacaoService,
    private authService: OAuthService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    const url = `http://localhost:4200/documentacaocustomer/${this.id}`;
    this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(
      `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=150x150`);
    if (this.authService.isAuthenticated()) {
      this.loadCarteira(); 
      this.loadCondutor();
      this.loadCao();
      this.loadAdestramento();
      this.loadDocumentacao();
    } else {
      console.error('Carteira não autenticada!');
    }
  }

  loadCarteira(): void {
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
        if (condutor.nascimento) {
          const formattedNascimento = new Date(condutor.nascimento).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          this.condutor = { ...condutor, nascimento: formattedNascimento };
        } else {
          this.condutor = condutor;
        }
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o condutor.';
        console.error(err);
      }
    });
  }

  loadCao(): void {
    this.caoService.findById(this.id).subscribe({
      next: (cao: Cao) => {
        if (cao.nascimento) {
          const formattedNascimento = new Date(cao.nascimento).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          this.cao = { ...cao, nascimento: formattedNascimento };
        } else {
          this.cao = cao;
        }
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o cão de serviço.';
        console.error(err);
      }
    });
  }

  loadAdestramento(): void {
    this.adestramentoService.findById(this.id).subscribe({
      next: (adestramento: Adestramento) => {
        this.adestramento = adestramento;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o adestramento.';
        console.error(err);
      }
    });
  }

  loadDocumentacao(): void {
    this.documentacaoService.findById(this.id).subscribe({
      next: (documentacao: Documentacao) => {
        this.documentacao = documentacao;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar a documentação.';
        console.error(err);
      }
    });
  }

  downloadPDF(): void {
    const data = this.identificacaoContainer.nativeElement;
    html2canvas(data, { useCORS: true }).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('carteira.pdf');
    });
  }  
}