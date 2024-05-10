import { Component, WritableSignal, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { Profile } from '../../models/profile';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [
      RouterLink,
      RouterLinkActive,
      NgIf
    ]
})
export class NavbarComponent {
  isDropdownOpen = false;
  profile: WritableSignal<Profile | null> = signal(null);

  constructor(private auth: AuthService, private router: Router) {
    inject(ProfileService).profile.subscribe((profile) => {
      this.profile.set(profile);
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 500); // delay of 500ms
  }

  async signIn() {
    await this.auth.signInWithGithub();
  }

  async signOut() {
    await this.auth.signOut();
    this.router.navigate(['/signin']);
  }
}

