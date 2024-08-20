import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs'
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { UserService } from '../../../services/user.service';
import { CondutorService } from '../../../services/condutor.service';
import { CaoService } from '../../../services/cao.service';
import { EnderecoService } from '../../../services/endereco.service';
import { AdestramentoService } from '../../../services/adestramento.service';
import { DocumentacaoService } from '../../../services/documentacao.service';
import { CadastroService } from '../../../services/cadastro.service';
import { User } from '../../../models/user';
import { Condutor } from '../../../models/condutor';
import { Cadastro } from '../../../models/cadastro';
import { ModalAdminComponent } from '../modal/modal.component';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.css'],
  standalone: true, 
  imports: [NavbarAdminComponent, FooterAdminComponent, RouterModule, CommonModule, ModalAdminComponent, FormsModule],
})
export class SolicitacoesComponent implements OnInit {
  users: User[] = [];
  pendingUsers: User[] = [];
  condutores: Condutor[] = [];
  errorMessage: string | null = null;
  showModal: boolean = false; 
  rejectionReason: string = '';
  selectedUserId: number | null = null;

  constructor(
    private userService: UserService,
    private condutorService: CondutorService,
    private caoService: CaoService,
    private enderecoService: EnderecoService,
    private adestramentoService: AdestramentoService,
    private documentacaoService: DocumentacaoService,
    private cadastroService: CadastroService,
    private authService: OAuthService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.loadUsers();
      this.loadCondutores();
    } else {
      console.error('Solicitações não autenticada!');
      this.router.navigate(['/oauth']);
    }
  }

  filterPendingUsers(): void {
    const pendingSolicitations = JSON.parse(localStorage.getItem('pendingSolicitations') || '[]');
    this.pendingUsers = this.users.filter(user => pendingSolicitations.includes(user.id));
  }

  clearPendingSolicitation(userId: number, rejectionReason?: string): void {
    let pendingSolicitations = JSON.parse(localStorage.getItem('pendingSolicitations') || '[]');
    pendingSolicitations = pendingSolicitations.filter((id: number) => id !== userId);
    localStorage.setItem('pendingSolicitations', JSON.stringify(pendingSolicitations));
    localStorage.removeItem(`isCadastroSubmitted_${userId}`);
    if (rejectionReason) {
      localStorage.setItem(`rejectionReason_${userId}`, rejectionReason);
    }
    this.filterPendingUsers();
  }

  loadUsers(): void {
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users = users;
        this.filterPendingUsers();
        this.associateCondutoresWithUsers();
      },
      error: (error) => console.error('Erro ao carregar os usuários', error)
    });
  }
  

  loadCondutores(): void {
    this.condutorService.findAll().subscribe({
      next: (condutores) => {
        this.condutores = condutores;
        this.associateCondutoresWithUsers();
      },
      error: (err) => console.error('Erro ao carregar condutores:', err)
    });
  }

  associateCondutoresWithUsers(): void {
    if (this.pendingUsers.length && this.condutores.length) {
      this.pendingUsers.forEach(user => {
        const condutor = this.condutores.find(c => c.id === user.id);
        if (condutor) {
          (user as any).condutor = condutor;
        }
      });
    }
  }

  getCondutorNome(user: User): string {
    return (user as any).condutor?.nome || '';
  }

  approveSolicitation(userId: number): void {
    Promise.all([
      firstValueFrom(this.condutorService.findById(userId)),
      firstValueFrom(this.caoService.findById(userId)),
      firstValueFrom(this.enderecoService.findById(userId)),
      firstValueFrom(this.adestramentoService.findById(userId)),
      firstValueFrom(this.documentacaoService.findById(userId))
    ]).then(([condutor, cao, endereco, adestramento, documentacao]) => {
      if (condutor && cao && endereco && adestramento && documentacao) {
        const cadastro: Cadastro = {
          id: userId, 
          condutor: condutor,
          cao: cao,
          endereco: endereco,
          adestramento: adestramento,
          documentacao: documentacao,
          qrCode: null
        };
  
        this.cadastroService.save(userId, cadastro).subscribe({
          next: () => {
            console.log("Cadastro salvo com sucesso.");
            this.clearPendingSolicitation(userId);
          },
          error: (err) => {
            console.error("Erro ao salvar o cadastro:", err);
          }
        });
      } else {
        console.error("Erro ao encontrar as informações necessárias para criar o cadastro.");
      }
    }).catch(error => {
      console.error("Erro ao carregar dados relacionados ao cadastro:", error);
    });
  }
  
  openRejectionModal(userId: number): void {
    this.selectedUserId = userId;
    this.rejectionReason = '';
    this.showModal = true;
  }

  closeRejectionModal(): void {
    this.showModal = false;
    this.selectedUserId = null;
    this.rejectionReason = '';
  }

  confirmRejection(): void {
    if (this.selectedUserId !== null) {
      this.clearPendingSolicitation(this.selectedUserId, this.rejectionReason);
      this.closeRejectionModal();
    }
  }

  rejectSolicitation(userId: number): void {
    this.openRejectionModal(userId);
  }

  perfil(userId: number): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/perfil', userId])
    );
    window.open(url, '_blank');
  }  
}