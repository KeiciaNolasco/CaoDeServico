import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'termos', component: TermosComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'leis', component: LeisComponent },
  { path: 'oauth', component: OauthComponent },
  { path: 'user', component: UserComponent },
  { path: 'condutor', component: CondutorComponent },
  { path: 'cao', component: CaoComponent },
  { path: 'endereco', component: EnderecoComponent },
  { path: 'adestramento', component: AdestramentoComponent },
  { path: 'documentacao', component: DocumentacaoComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
