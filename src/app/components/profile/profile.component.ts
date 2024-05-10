import { Component, WritableSignal, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '@supabase/auth-js';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isDropdownOpen = false;
  userData: WritableSignal<User | null> = signal(null);

  constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUser.subscribe((user) => {
      return this.userData.set(user);
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  async signOut() {
    await this.auth.signOut();
    this.router.navigate(['/signin']);
  }
}
