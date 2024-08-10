import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; 

@Component({
  selector: 'app-leis',
  templateUrl: './leis.component.html',
  styleUrls: ['./leis.component.css'],
  standalone: true, 
  imports: [NavbarComponent, RouterModule],
})
export class LeisComponent {
}
