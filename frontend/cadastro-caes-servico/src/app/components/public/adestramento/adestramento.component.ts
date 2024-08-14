import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { AdestramentoService } from '../../../services/adestramento.service';
import { Adestramento } from '../../../models/adestramento';

@Component({
  selector: 'app-adestramento',
  templateUrl: './adestramento.component.html',
  styleUrls: ['./adestramento.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent], 
})

export class AdestramentoComponent implements OnInit {
  id!: number;
  adestramento: Adestramento = {
    adestrador: '',
    cpf: '',
    instituicao: '',
    cnpj: '',
    tempo: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adestramentoService: AdestramentoService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  save(): void {
    this.adestramentoService.save(this.id, this.adestramento).subscribe({
      next: (adestramento) => {
        console.log('Adestramento salvo com sucesso:', adestramento);
        this.router.navigate(['/documentacao', this.id]);
      },
      error: (err) => {
        console.error('Erro ao salvar o Adestramento:', err);
      }
    });
  }
}