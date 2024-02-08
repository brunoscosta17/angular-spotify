import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faPerson } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/interfaces/IUser';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  faPerson = faPerson;

  noImage = 'assets/images/person.png';

  user!: IUser;

  constructor(
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService
      .getSpotfyUser()
      .then(() => this.user = this.spotifyService.user);
  }

  logout() {
    this.spotifyService.logout();
  }

}
