import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.verifyUrlCallbackAccessToken();
  }

  verifyUrlCallbackAccessToken() {
    const token = this.spotifyService.getUrlCallbackAccessToken();
    if (!!token) this.spotifyService.setAccessToken(token);
    console.log(token);
  }

  openSpotify() {
    window.location.href = this.spotifyService.getUrlLogin();
  }

}
