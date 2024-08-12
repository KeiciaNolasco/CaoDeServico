import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-documentacao',
  templateUrl: './documentacao.component.html',
  styleUrls: ['./documentacao.component.css'],
  standalone: true, 
  imports: [NavbarComponent, FooterComponent, RouterModule],
})
export class DocumentacaoComponent {
}
