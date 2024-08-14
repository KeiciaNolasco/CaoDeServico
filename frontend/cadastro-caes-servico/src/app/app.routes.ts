import { Routes } from '@angular/router';
import { NavbarComponent } from './components/public/navbar/navbar.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { TermosComponent } from './components/public/termos/termos.component';
import { InicioComponent } from './components/public/inicio/inicio.component';
import { SobreComponent } from './components/public/sobre/sobre.component';
import { LeisComponent } from './components/public/leis/leis.component';
import { OauthComponent } from './components/public/oauth/oauth.component';
import { PerfilComponent } from './components/customer/perfil/perfil.component';
import { UserComponent } from './components/public/user/user.component';
import { CondutorComponent } from './components/public/condutor/condutor.component';
import { CaoComponent } from './components/public/cao/cao.component';
import { EnderecoComponent } from './components/public/endereco/endereco.component';
import { AdestramentoComponent } from './components/public/adestramento/adestramento.component';
import { DocumentacaoComponent } from './components/public/documentacao/documentacao.component';
import { CadastroComponent } from './components/public/cadastro/cadastro.component';
import { Guard } from './services/guard.service';

export const appRoutes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'termos', component: TermosComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'leis', component: LeisComponent },
  { path: 'oauth', component: OauthComponent },
  { path: 'perfil/:id', component: PerfilComponent, canActivate: [Guard] },
  { path: 'user', component: UserComponent, canActivate: [Guard] },
  { path: 'condutor/:id', component: CondutorComponent, canActivate: [Guard] },
  { path: 'cao/:id', component: CaoComponent, canActivate: [Guard] },
  { path: 'endereco/:id', component: EnderecoComponent, canActivate: [Guard] },
  { path: 'adestramento/:id', component: AdestramentoComponent, canActivate: [Guard] },
  { path: 'documentacao/:id', component: DocumentacaoComponent, canActivate: [Guard] },
  { path: 'cadastro/:id', component: CadastroComponent, canActivate: [Guard] },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' } 
];
