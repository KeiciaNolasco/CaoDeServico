import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { CondutorService } from '../../../services/condutor.service';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-condutor',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent], 
})

export class CondutorComponent implements OnInit {
  id!: number;
  condutor: Condutor = {
    nome: '',
    nascimento: '',
    cpf: '',
    contato: '',
    cid: '',
    foto: null
  };
  selectedFile!: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private condutorService: CondutorService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then(base64 => {
        const base64String = (base64 as string).split(',')[1];
        this.condutor.foto = base64String; 
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
    this.condutorService.save(this.id, this.condutor).subscribe({
      next: (condutor) => {
        console.log('Condutor salvo com sucesso:', condutor);
        this.router.navigate(['/cao', this.id]);
      },
      error: (err) => {
        console.error('Erro ao salvar o condutor:', err);
      }
    });
  }
}