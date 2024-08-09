import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true, 
  imports: [NavbarComponent],
})
export class InicioComponent {
}
