import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private supabase!: SupabaseClient;

  profile = new BehaviorSubject<Profile | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.fetchProfile(session!.user.id);
      } else if (event === 'INITIAL_SESSION' && session) {
        this.fetchProfile(session.user.id);
      } else {
        this.profile.next(null);
      }
    });
  }

  async fetchProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
    }

    if (data) {
      this.profile.next(data);
    }
  }
}
