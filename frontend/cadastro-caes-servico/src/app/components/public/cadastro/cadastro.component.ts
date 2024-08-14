import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { CadastroService } from '../../../services/cadastro.service';
import { CondutorService } from '../../../services/condutor.service';
import { CaoService } from '../../../services/cao.service';
import { EnderecoService } from '../../../services/endereco.service';
import { AdestramentoService } from '../../../services/adestramento.service';
import { DocumentacaoService } from '../../../services/documentacao.service';
import { Cadastro } from '../../../models/cadastro';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent], 
})

export class CadastroComponent implements OnInit {
  id!: number;
  cadastro: Cadastro = {
    condutor: {
      nome: '',
      nascimento: '',
      cpf: '',
      contato: '',
      cid: '',
      foto: null,
    },
    cao: {
      nome: '',
      nascimento: '',
      raca: '',
      microchip: '',
      categoria: null,
      foto: null,
    },
    endereco: {
      pais: '',
      estado: '',
      cep: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      complemento: ''
    },
    adestramento: {
      adestrador: '',
      cpf: '',
      instituicao: '',
      cnpj: '',
      tempo: ''
    },
    documentacao: {
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
    },
    qrCode: null
  };
  categorias = Object.values(Categoria);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cadastroService: CadastroService,
    private condutorService: CondutorService,
    private caoService: CaoService,
    private enderecoService: EnderecoService,
    private adestramentoService: AdestramentoService,
    private documentacaoService: DocumentacaoService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadRelatedEntities(this.id);
  }

  loadRelatedEntities(id: number): void {
    this.condutorService.findById(id).subscribe({
        next: (condutor) => {
            this.cadastro.condutor = condutor;
            this.loadCao(id); 
        },
        error: (err) => {
            console.error('Erro ao carregar o Condutor:', err);
        }
    });
}

loadCao(id: number): void {
    this.caoService.findById(id).subscribe({
        next: (cao) => {
            this.cadastro.cao = cao;
            this.cadastro.cao.categoria = this.categorias.find(
                categoria => categoria === cao.categoria
            ) || null;
            this.loadEndereco(id); 
        },
        error: (err) => {
            console.error('Erro ao carregar o Cão:', err);
        }
    });
}

loadEndereco(id: number): void {
    this.enderecoService.findById(id).subscribe({
        next: (endereco) => {
            this.cadastro.endereco = endereco;
            this.loadAdestramento(id); 
        },
        error: (err) => {
            console.error('Erro ao carregar o Endereço:', err);
        }
    });
}

loadAdestramento(id: number): void {
    this.adestramentoService.findById(id).subscribe({
        next: (adestramento) => {
            this.cadastro.adestramento = adestramento;
            this.loadDocumentacao(id); 
        },
        error: (err) => {
            console.error('Erro ao carregar o Adestramento:', err);
        }
    });
}

loadDocumentacao(id: number): void {
    this.documentacaoService.findById(id).subscribe({
        next: (documentacao) => {
            this.cadastro.documentacao = documentacao;
        },
        error: (err) => {
            console.error('Erro ao carregar a Documentação:', err);
        }
    });
}

  onFileSelected(event: any, field: 'fotoCondutor' | 'fotoCao' | keyof Cadastro['documentacao']): void {
    const file: File = event.target.files[0];
    if (file) {
        this.convertFileToBase64(file).then(base64 => {
            const base64String = (base64 as string).split(',')[1];
            if (field === 'fotoCondutor') {
                this.cadastro.condutor.foto = base64String;
            } else if (field === 'fotoCao') {
                this.cadastro.cao.foto = base64String;
            } else if (field in this.cadastro.documentacao) {
                (this.cadastro.documentacao[field] as string | null) = base64String;
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
    this.cadastroService.save(this.id, this.cadastro).subscribe({
      next: (cadastro) => {
        console.log('Cadastro salvo com sucesso:', this.cadastro);
        this.router.navigate(['/oauth']);
      },
      error: (err) => {
        console.error('Erro ao salvar o Cadastro:', err);
      }
    });
  }
}