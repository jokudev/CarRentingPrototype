import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUser.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/signin']);
      }
    });
  }

}
