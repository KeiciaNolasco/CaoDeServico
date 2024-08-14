import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { DocumentacaoService } from '../../../services/documentacao.service';
import { Documentacao } from '../../../models/documentacao';

@Component({
  selector: 'app-documentacao',
  templateUrl: './documentacao.component.html',
  styleUrls: ['./documentacao.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent], 
})

export class DocumentacaoComponent implements OnInit {
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
    provaAdestramento: null,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentacaoService: DocumentacaoService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  onFileSelected(event: any, field: keyof Documentacao): void { 
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then(base64 => {
        const base64String = (base64 as string).split(',')[1];
        if (typeof this.documentacao[field] === 'string' || this.documentacao[field] === null) {
          (this.documentacao[field] as string | null) = base64String;
        }
      });
    }
  }

  convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  save(): void {
    this.documentacaoService.save(this.id, this.documentacao).subscribe({
      next: (documentacao) => {
        console.log('Documentação salva com sucesso:', documentacao);
        this.router.navigate(['/cadastro', this.id]);
      },
      error: (err) => {
        console.error('Erro ao salvar o Documentação:', err);
      }
    });
  }
}