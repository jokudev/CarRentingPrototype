import { Injectable, NgZone } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private supabase!: SupabaseClient;

  constructor(private router: Router, private ngZone: NgZone) {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.user.next(session!.user);
        this.ngZone.run(() => this.router.navigate(['/dashboard']));
      } else if (event === 'INITIAL_SESSION' && session) {
        this.user.next(session.user);
      } else {
        this.user.next(null);
      }
    });
  }

  async signInWithGithub() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }

  get currentUser() {
    return this.user.asObservable();
  }
}
