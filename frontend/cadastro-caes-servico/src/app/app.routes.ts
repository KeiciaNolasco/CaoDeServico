import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component'; 
import { InicioComponent } from './components/inicio/inicio.component';
import { SobreComponent } from './components/sobre/sobre.component';

export const appRoutes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: '', redirectTo: '/navbar', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'sobre', component: SobreComponent },
  { path: '', redirectTo: '/sobre', pathMatch: 'full' },
];
