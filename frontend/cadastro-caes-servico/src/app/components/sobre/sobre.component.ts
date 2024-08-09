import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; 

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css'],
  standalone: true, 
  imports: [NavbarComponent],
})
export class SobreComponent {
}
