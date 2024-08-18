import { Routes } from '@angular/router';

import { NavbarComponent } from './components/public/navbar/navbar.component';
import { NavbarCustomerComponent } from './components/customer/navbar/navbar.component';
import { NavbarAdminComponent } from './components/admin/navbar/navbar.component';

import { FooterComponent } from './components/public/footer/footer.component';
import { FooterCustomerComponent } from './components/customer/footer/footer.component';
import { FooterAdminComponent } from './components/admin/footer/footer.component';

import { TermosComponent } from './components/public/termos/termos.component';
import { TermosCustomerComponent } from './components/customer/termos/termos.component';
import { TermosAdminComponent } from './components/admin/termos/termos.component';

import { InicioComponent } from './components/public/inicio/inicio.component';
import { InicioCustomerComponent } from './components/customer/inicio/inicio.component';
import { InicioAdminComponent } from './components/admin/inicio/inicio.component';

import { SobreComponent } from './components/public/sobre/sobre.component';
import { SobreCustomerComponent } from './components/customer/sobre/sobre.component';
import { SobreAdminComponent } from './components/admin/sobre/sobre.component';

import { LeisComponent } from './components/public/leis/leis.component';
import { LeisCustomerComponent } from './components/customer/leis/leis.component';
import { LeisAdminComponent } from './components/admin/leis/leis.component';

import { OauthComponent } from './components/public/oauth/oauth.component';

import { PerfilComponent } from './components/customer/perfil/perfil.component';
import { PerfilAdminComponent } from './components/admin/perfil/perfil.component';

import { UserSaveComponent } from './components/public/usersave/user.component';
import { UserCustomerComponent } from './components/customer/user/user.component';
import { UserUpdateComponent } from './components/customer/userupdate/user.component';
import { UserUpdateAdminCustomerComponent } from './components/customer/userupdateadmin/user.component';
import { UserAdminComponent } from './components/admin/user/user.component';
import { UserSaveAdminComponent } from './components/admin/usersave/user.component';
import { UserUpdateAdminComponent } from './components/admin/userupdate/user.component';

import { CondutorCustomerComponent } from './components/customer/condutor/condutor.component';
import { CondutorSaveComponent } from './components/customer/condutorsave/condutor.component';
import { CondutorUpdateComponent } from './components/customer/condutorupdate/condutor.component';

import { CaoCustomerComponent } from './components/customer/cao/cao.component';
import { CaoSaveComponent } from './components/customer/caosave/cao.component';
import { CaoUpdateComponent } from './components/customer/caoupdate/cao.component';

import { EnderecoCustomerComponent } from './components/customer/endereco/endereco.component';
import { EnderecoSaveComponent } from './components/customer/enderecosave/endereco.component';
import { EnderecoUpdateComponent } from './components/customer/enderecoupdate/endereco.component';

import { AdestramentoCustomerComponent } from './components/customer/adestramento/adestramento.component';
import { AdestramentoSaveComponent } from './components/customer/adestramentosave/adestramento.component';
import { AdestramentoUpdateComponent } from './components/customer/adestramentoupdate/adestramento.component';

import { DocumentacaoCustomerComponent } from './components/customer/documentacao/documentacao.component';
import { DocumentacaoSaveComponent } from './components/customer/documentacaosave/documentacao.component';
import { DocumentacaoUpdateComponent } from './components/customer/documentacaoupdate/documentacao.component';

import { CadastroCustomerComponent } from './components/customer/cadastro/cadastro.component';

import { SolicitacoesComponent } from './components/admin/solicitacoes/solicitacoes.component';

import { UsersAdminComponent } from './components/admin/users/users.component';
import { UsersFindAllAdminComponent } from './components/admin/usersfindall/users.component';

import { ModalCustomerComponent } from './components/customer/modal/modal.component';
import { ModalAdminComponent } from './components/admin/modal/modal.component';

import { Guard } from './services/guard.service';

export const appRoutes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'navbarcustomer/:id', component: NavbarCustomerComponent, canActivate: [Guard] },
  { path: 'navbaradmin/:id', component: NavbarAdminComponent, canActivate: [Guard] },

  { path: 'footer', component: FooterComponent },
  { path: 'footercustomer/:id', component: FooterCustomerComponent, canActivate: [Guard] },
  { path: 'footeradmin/:id', component: FooterAdminComponent, canActivate: [Guard] },

  { path: 'termos', component: TermosComponent },
  { path: 'termoscustomer/:id', component: TermosCustomerComponent, canActivate: [Guard] },
  { path: 'termosadmin/:id', component: TermosAdminComponent, canActivate: [Guard] },

  { path: 'inicio', component: InicioComponent },
  { path: 'iniciocustomer/:id', component: InicioCustomerComponent, canActivate: [Guard] },
  { path: 'inicioadmin/:id', component: InicioAdminComponent, canActivate: [Guard] },

  { path: 'sobre', component: SobreComponent },
  { path: 'sobrecustomer/:id', component: SobreCustomerComponent, canActivate: [Guard] },
  { path: 'sobreadmin/:id', component: SobreAdminComponent, canActivate: [Guard] },

  { path: 'leis', component: LeisComponent },
  { path: 'leiscustomer/:id', component: LeisCustomerComponent, canActivate: [Guard] },
  { path: 'leisadmin/:id', component: LeisAdminComponent, canActivate: [Guard] },

  { path: 'oauth', component: OauthComponent },

  { path: 'perfil/:id', component: PerfilComponent, canActivate: [Guard] },
  { path: 'perfiladmin/:id', component: PerfilAdminComponent, canActivate: [Guard] },

  { path: 'usersave', component: UserSaveComponent },
  { path: 'usercustomer/:id', component: UserCustomerComponent, canActivate: [Guard] },
  { path: 'userupdate/:id', component: UserUpdateComponent, canActivate: [Guard] },
  { path: 'userupdateadmincustomer/:id', component: UserUpdateAdminCustomerComponent, canActivate: [Guard] },
  { path: 'useradmin/:id', component: UserAdminComponent, canActivate: [Guard] },
  { path: 'usersaveadmin/:id', component: UserSaveAdminComponent, canActivate: [Guard]  },
  { path: 'userupdateadmin/:id', component: UserUpdateAdminComponent, canActivate: [Guard] },

  { path: 'condutorcustomer/:id', component: CondutorCustomerComponent, canActivate: [Guard] },
  { path: 'condutorsave/:id', component: CondutorSaveComponent, canActivate: [Guard] },
  { path: 'condutorupdate/:id', component: CondutorUpdateComponent, canActivate: [Guard] },

  { path: 'caocustomer/:id', component: CaoCustomerComponent, canActivate: [Guard] },
  { path: 'caosave/:id', component: CaoSaveComponent, canActivate: [Guard] },
  { path: 'caoupdate/:id', component: CaoUpdateComponent, canActivate: [Guard] },

  { path: 'enderecocustomer/:id', component: EnderecoCustomerComponent, canActivate: [Guard] },
  { path: 'enderecosave/:id', component: EnderecoSaveComponent, canActivate: [Guard] },
  { path: 'enderecoupdate/:id', component: EnderecoUpdateComponent, canActivate: [Guard] },

  { path: 'adestramentocustomer/:id', component: AdestramentoCustomerComponent, canActivate: [Guard] },
  { path: 'adestramentosave/:id', component: AdestramentoSaveComponent, canActivate: [Guard] },
  { path: 'adestramentoupdate/:id', component: AdestramentoUpdateComponent, canActivate: [Guard] },

  { path: 'documentacaocustomer/:id', component: DocumentacaoCustomerComponent, canActivate: [Guard] },
  { path: 'documentacaosave/:id', component: DocumentacaoSaveComponent, canActivate: [Guard] },
  { path: 'documentacaoupdate/:id', component: DocumentacaoUpdateComponent, canActivate: [Guard] },

  { path: 'cadastrocustomer/:id', component: CadastroCustomerComponent, canActivate: [Guard] },

  { path: 'solicitacoes/:id', component: SolicitacoesComponent, canActivate: [Guard] },

  { path: 'usersadmin/:id', component: UsersAdminComponent, canActivate: [Guard] },
  { path: 'usersfindalladmin/:id', component: UsersFindAllAdminComponent, canActivate: [Guard] },

  { path: 'modalcustomer/:id', component: ModalCustomerComponent, canActivate: [Guard] },
  { path: 'modaladmin/:id', component: ModalAdminComponent, canActivate: [Guard] },

  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' } 
];
