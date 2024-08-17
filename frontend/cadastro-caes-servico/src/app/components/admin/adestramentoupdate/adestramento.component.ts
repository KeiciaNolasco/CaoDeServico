import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { AdestramentoService } from '../../../services/adestramento.service';
import { CondutorService } from '../../../services/condutor.service';
import { Adestramento } from '../../../models/adestramento';
import { Condutor } from '../../../models/condutor';
import { FooterCustomerComponent } from "../../customer/footer/footer.component";

@Component({
  selector: 'app-adestramentoupdateadmin',
  templateUrl: './adestramento.component.html',
  styleUrls: ['./adestramento.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule, NavbarAdminComponent, FooterAdminComponent, FooterCustomerComponent], 
})

export class AdestramentoUpdateAdminComponent implements OnInit {
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
      this.loadAdestramentoUpdate();
      this.loadCondutor();
    } else {
      console.error('Adestramento não autenticado!');
      this.router.navigate(['/oauth']);
    }
  }

  loadAdestramentoUpdate(): void {
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

  findById(id: number): void {
    this.adestramentoService.findById(this.id).subscribe({
      next: (adestramento : Adestramento) => {
        this.adestramento = adestramento
      },
      error: (err) => {
        this.errorMessage = 'Erro ao buscar o adestramento.';
        console.error(err);
      }
    });
  }

  update(): void {
    if (this.adestramento) {
      this.adestramentoService.update(this.id, this.adestramento).subscribe({
        next: () => {
          console.log('Adestramento atualizado com sucesso!');
          this.router.navigate(['/adestramentoadmin', this.id]);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao atualizar o adestramento.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Adestramento não encontrado.';
    }
  }

  cancel(): void {
    this.router.navigate(['/adestramentoadmin', this.id]);
  } 
}