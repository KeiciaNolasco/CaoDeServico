import { Routes } from '@angular/router';
import { NavbarComponent } from './components/public/navbar/navbar.component';
import { NavbarCustomerComponent } from './components/customer/navbar/navbar.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { FooterCustomerComponent } from './components/customer/footer/footer.component';
import { TermosComponent } from './components/public/termos/termos.component';
import { TermosCustomerComponent } from './components/customer//termos/termos.component';
import { InicioComponent } from './components/public/inicio/inicio.component';
import { InicioCustomerComponent } from './components/customer/inicio/inicio.component';
import { SobreComponent } from './components/public/sobre/sobre.component';
import { SobreCustomerComponent } from './components/customer/sobre/sobre.component';
import { LeisComponent } from './components/public/leis/leis.component';
import { LeisCustomerComponent } from './components/customer/leis/leis.component';
import { OauthComponent } from './components/public/oauth/oauth.component';
import { PerfilComponent } from './components/customer/perfil/perfil.component';
import { UserComponent } from './components/public/user/user.component';
import { UserCustomerComponent } from './components/customer/user/user.component';
import { UserUpdateComponent } from './components/customer/userupdate/user.component';
import { CondutorCustomerComponent } from './components/customer/condutor/condutor.component';
import { CondutorSaveComponent } from './components/customer/condutorsave/condutor.component';
import { CondutorUpdateComponent } from './components/customer/condutorupdate/condutor.component';
import { CaoCustomerComponent } from './components/customer/cao/cao.component';
import { EnderecoComponent } from './components/public/endereco/endereco.component';
import { AdestramentoComponent } from './components/public/adestramento/adestramento.component';
import { DocumentacaoComponent } from './components/public/documentacao/documentacao.component';
import { CadastroComponent } from './components/public/cadastro/cadastro.component';
import { ModalCustomerComponent } from './components/customer/modal/modal.component';
import { Guard } from './services/guard.service';

export const appRoutes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'navbarcustomer/:id', component: NavbarCustomerComponent, canActivate: [Guard] },
  { path: 'footer', component: FooterComponent },
  { path: 'footercustomer/:id', component: FooterCustomerComponent, canActivate: [Guard] },
  { path: 'termos', component: TermosComponent },
  { path: 'termoscustomer/:id', component: TermosCustomerComponent, canActivate: [Guard] },
  { path: 'inicio', component: InicioComponent },
  { path: 'iniciocustomer/:id', component: InicioCustomerComponent, canActivate: [Guard] },
  { path: 'sobre', component: SobreComponent },
  { path: 'sobrecustomer/:id', component: SobreCustomerComponent, canActivate: [Guard] },
  { path: 'leis', component: LeisComponent },
  { path: 'leiscustomer/:id', component: LeisCustomerComponent, canActivate: [Guard] },
  { path: 'oauth', component: OauthComponent },
  { path: 'perfil/:id', component: PerfilComponent, canActivate: [Guard] },
  { path: 'user', component: UserComponent },
  { path: 'usercustomer/:id', component: UserCustomerComponent, canActivate: [Guard] },
  { path: 'userupdate/:id', component: UserUpdateComponent, canActivate: [Guard] },
  { path: 'condutorcustomer/:id', component: CondutorCustomerComponent, canActivate: [Guard] },
  { path: 'condutorsave/:id', component: CondutorSaveComponent, canActivate: [Guard] },
  { path: 'condutorupdate/:id', component: CondutorUpdateComponent, canActivate: [Guard] },
  { path: 'caocustomer/:id', component: CaoCustomerComponent, canActivate: [Guard] },
  { path: 'endereco/:id', component: EnderecoComponent, canActivate: [Guard] },
  { path: 'adestramento/:id', component: AdestramentoComponent, canActivate: [Guard] },
  { path: 'documentacao/:id', component: DocumentacaoComponent, canActivate: [Guard] },
  { path: 'cadastro/:id', component: CadastroComponent, canActivate: [Guard] },
  { path: 'modalcustomer/:id', component: ModalCustomerComponent, canActivate: [Guard] },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' } 
];
