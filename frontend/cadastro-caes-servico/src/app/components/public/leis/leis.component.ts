import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-leis',
  templateUrl: './leis.component.html',
  styleUrls: ['./leis.component.css'],
  standalone: true, 
  imports: [NavbarComponent, FooterComponent, RouterModule],
})
export class LeisComponent {
}
