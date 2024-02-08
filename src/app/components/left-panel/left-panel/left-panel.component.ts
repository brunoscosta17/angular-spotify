import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  faHome = faHome;
  faSearch = faSearch;
  faGuitar = faGuitar;
  faMusic = faMusic;

  menuItemActive: string = 'home';

  playlists: IPlaylist[] = [];

  constructor(
    private spotfyService: SpotifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  onClick(menuItem: string): void {
    console.log(menuItem);
    this.menuItemActive = menuItem;
    this.router.navigate([`/player/${menuItem}`]);
  }

  async getPlaylists(): Promise<void> {
    this.playlists = await this.spotfyService.getPlaylists();
  }

}
