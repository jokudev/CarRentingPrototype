import { Component } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [
      ProfileComponent,
      RouterLink,
      RouterLinkActive
    ]
})
export class NavbarComponent {

}

