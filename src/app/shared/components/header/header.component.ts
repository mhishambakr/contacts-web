import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
