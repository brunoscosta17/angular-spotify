import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService) { }

  canLoad(
    route: import('@angular/router').Route,
    segments: import('@angular/router').UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {

      const token = localStorage.getItem('token');

      if (!token) {
        return this.notAuthenticated();
      }
      return new Promise(resolve => {
        const userCreated = this.spotifyService.startUser();
        if (!userCreated) {
          resolve(this.notAuthenticated());
        }
        resolve(true);
      });
    return true;
  }

  notAuthenticated(): boolean {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    return false;
  }

}
