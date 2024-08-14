import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-navbarcustomer',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true, 
  imports: [RouterModule, CommonModule],
})

export class NavbarCustomerComponent implements OnInit {

  id!: number;
  navbar: any;

  isDropdownVisible = false;

  constructor(
    private authService: OAuthService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.authService.isAuthenticated()) {
      this.loadNavbar();
    } else {
      console.error('Usuário não autenticado!');
    }
  }

  loadNavbar(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
      } catch (error) {
        console.error('Erro ao decodificar o token JWT', error);
      }
    }
  }

  showDropdown() {
    this.isDropdownVisible = true;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }

  logout(): void {
    this.authService.logout();
  }
}

