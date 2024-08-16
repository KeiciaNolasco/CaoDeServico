import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarCustomerComponent } from '../navbar/navbar.component'; 
import { FooterCustomerComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { AdestramentoService } from '../../../services/adestramento.service';
import { CondutorService } from '../../../services/condutor.service';
import { Adestramento } from '../../../models/adestramento';
import { Condutor } from '../../../models/condutor';

@Component({
  selector: 'app-adestramentosave',
  templateUrl: './adestramento.component.html',
  styleUrls: ['./adestramento.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarCustomerComponent, FooterCustomerComponent], 
})

export class AdestramentoSaveComponent implements OnInit {
  id!: number;
  adestramento: Adestramento = {
    adestrador: '',
    cpf: '',
    instituicao: '',
    cnpj: '',
    tempo: ''
  }
  condutor: Condutor | undefined; 
  errorMessage: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adestramentoService: AdestramentoService,
    private condutorService: CondutorService,
    private authService: OAuthService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadAdestramentoSave();
      this.loadCondutor();
    } else {
      console.error('Adestramento não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadAdestramentoSave(): void {
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

  save(): void {
    this.adestramentoService.save(this.id, this.adestramento).subscribe({
      next: () => {
        console.log("Adestramento salvo com sucesso.");
        this.router.navigate(['/adestramentocustomer', this.id]);
      },
      error: (err) => {
        console.error("Erro ao salvar o adestramento:", err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/adestramentocustomer', this.id]);
  } 
}