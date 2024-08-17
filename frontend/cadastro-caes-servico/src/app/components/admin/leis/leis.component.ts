import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarAdminComponent } from '../navbar/navbar.component'; 
import { FooterAdminComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-leisadmin',
  templateUrl: './leis.component.html',
  styleUrls: ['./leis.component.css'],
  standalone: true, 
  imports: [NavbarAdminComponent, FooterAdminComponent, RouterModule],
})
export class LeisAdminComponent implements OnInit {
  id!: number;
  leis: any;

  constructor(
    private authService: OAuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadLeis();
    } else {
      console.error('Usuário não autenticado!');
    }
  }

  loadLeis(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
      } catch (error) {
        console.error('Erro ao decodificar o token JWT', error);
      }
    }
  }
}