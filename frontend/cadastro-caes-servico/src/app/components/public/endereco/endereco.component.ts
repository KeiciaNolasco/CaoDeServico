import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { EnderecoService } from '../../../services/endereco.service';
import { Endereco } from '../../../models/endereco';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent], 
})

export class EnderecoComponent implements OnInit {
  id!: number;
  endereco: Endereco = {
    pais: '',
    estado: '',
    cep: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enderecoService: EnderecoService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  save(): void {
    this.enderecoService.save(this.id, this.endereco).subscribe({
      next: (endereco) => {
        console.log('Endereço salvo com sucesso:', endereco);
        this.router.navigate(['/adestramento', this.id]);
      },
      error: (err) => {
        console.error('Erro ao salvar o Endereço:', err);
      }
    });
  }
}