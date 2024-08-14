import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { CaoService } from '../../../services/cao.service';
import { Cao } from '../../../models/cao';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-cao',
  templateUrl: './cao.component.html',
  styleUrls: ['./cao.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent], 
})

export class CaoComponent implements OnInit {
  id!: number;
  cao: Cao = {
    nome: '',
    nascimento: '',
    raca: '',
    microchip: '',
    categoria: null,
    foto: null
  };
  categorias = Object.values(Categoria);
  selectedFile!: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caoService: CaoService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then(base64 => {
        const base64String = (base64 as string).split(',')[1];
        this.cao.foto = base64String; 
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
    this.caoService.save(this.id, this.cao).subscribe({
      next: (cao) => {
        console.log('Cão de Serviço salvo com sucesso:', cao);
        this.router.navigate(['/endereco', this.id]);
      },
      error: (err) => {
        console.error('Erro ao salvar o Cão de Serviço:', err);
      }
    });
  }
}