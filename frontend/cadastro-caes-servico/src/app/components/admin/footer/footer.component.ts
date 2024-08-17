import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-footeradmin',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true, 
  imports: [RouterModule, CommonModule],
})

export class FooterAdminComponent implements OnInit {
  id!: number;
  footer: any;

  constructor(
    private authService: OAuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadFooter();
    } else {
      console.error('Usuário não autenticado!');
    }
  }

  loadFooter(): void {
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
