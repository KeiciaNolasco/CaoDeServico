import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component'; 
import { InicioComponent } from './components/inicio/inicio.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { LeisComponent } from './components/leis/leis.component';

export const appRoutes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: '', redirectTo: '/navbar', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'sobre', component: SobreComponent },
  { path: '', redirectTo: '/sobre', pathMatch: 'full' },
  { path: 'leis', component: LeisComponent },
  { path: '', redirectTo: '/leis', pathMatch: 'full' }
];
