import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.verifyUrlCallbackAccessToken();
  }

  verifyUrlCallbackAccessToken() {
    const token = this.spotifyService.getUrlCallbackAccessToken();
    if (!!token) {
      this.spotifyService.setAccessToken(token);
      this.router.navigateByUrl('/player/home');
    }
  }

  openSpotify() {
    window.location.href = this.spotifyService.getUrlLogin();
  }

}
