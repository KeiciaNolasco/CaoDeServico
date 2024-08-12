import { Routes } from '@angular/router';
import { NavbarComponent } from './components/public/navbar/navbar.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { TermosComponent } from './components/public/termos/termos.component';
import { InicioComponent } from './components/public/inicio/inicio.component';
import { SobreComponent } from './components/public/sobre/sobre.component';
import { LeisComponent } from './components/public/leis/leis.component';
import { OauthComponent } from './components/public/oauth/oauth.component';
import { UserComponent } from './components/public/user/user.component';
import { CondutorComponent } from './components/public/condutor/condutor.component';
import { CaoComponent } from './components/public/cao/cao.component';
import { EnderecoComponent } from './components/public/endereco/endereco.component';
import { AdestramentoComponent } from './components/public/adestramento/adestramento.component';
import { DocumentacaoComponent } from './components/public/documentacao/documentacao.component';
import { CadastroComponent } from './components/public/cadastro/cadastro.component';

export const appRoutes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: '', redirectTo: '/navbar', pathMatch: 'full' },
  { path: 'footer', component: FooterComponent },
  { path: '', redirectTo: '/footer', pathMatch: 'full' },
  { path: 'termos', component: TermosComponent },
  { path: '', redirectTo: '/termos', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'sobre', component: SobreComponent },
  { path: '', redirectTo: '/sobre', pathMatch: 'full' },
  { path: 'leis', component: LeisComponent },
  { path: '', redirectTo: '/leis', pathMatch: 'full' },
  { path: 'oauth', component: OauthComponent },
  { path: '', redirectTo: '/oauth', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'condutor', component: CondutorComponent },
  { path: '', redirectTo: '/condutor', pathMatch: 'full' },
  { path: 'cao', component: CaoComponent },
  { path: '', redirectTo: '/cao', pathMatch: 'full' },
  { path: 'endereco', component: EnderecoComponent },
  { path: '', redirectTo: '/endereco', pathMatch: 'full' },
  { path: 'adestramento', component: AdestramentoComponent },
  { path: '', redirectTo: '/adestramento', pathMatch: 'full' },
  { path: 'documentacao', component: DocumentacaoComponent },
  { path: '', redirectTo: '/documentacao', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroComponent },
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' }
];
