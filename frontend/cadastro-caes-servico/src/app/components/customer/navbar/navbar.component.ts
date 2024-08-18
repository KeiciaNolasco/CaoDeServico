import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OAuthService } from '../../../services/oauth.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../services/user.service'; 
import { User } from '../../../models/user'; 


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
  isAdmin = false;
  isDropdownVisible = false;

  constructor(
    private userService: UserService,
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
        const email = decodedToken.email; 
        if (email) {
          this.userService.findByEmail(email).subscribe({
            next: (user: User) => {
              if (user.id !== undefined && user.id !== null) {
                this.id = user.id;
                const roles = user.roles || [];
                this.isAdmin = roles.some(role => role.nome === 'ADMIN');
              }
            },
            error: (err) => {
              console.error('Erro ao buscar informações do usuário', err);
            }
          });
        } else {
          console.error('Email não encontrado no token.');
        }
      } catch (error) {
        console.error('Erro ao decodificar o token JWT', error);
      }
    } else {
      console.error('Token não encontrado.');
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

