import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { NavbarComponent } from '../navbar/navbar.component'; 
import { FooterComponent } from '../footer/footer.component';
import { OAuthService } from '../../../services/oauth.service';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css'],
  standalone: true, 
  imports: [ CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent ], 
})

export class OauthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private oauthService: OAuthService, private router: Router) {}

  login(): void {
    this.oauthService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/condutor']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      },
    });
  }
}
