import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { newSong } from 'src/app/commom/factories';
import { ISong } from 'src/app/interfaces/ISong';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  songs:ISong[] = [];
  currentSong: ISong = newSong();

  subscription: Subscription[] = [];

  faPlay = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getSongs();
    this.getCurrentSong();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  async getSongs(): Promise<void> {
    this.songs = await this.spotifyService.searchForSongs();
  }

  getArtists(song: ISong): string {
    return song.artists.map(artist => artist.name).join(', ');
  }

  getCurrentSong(): void {
    const subscription = this.playerService.currentSong.subscribe(song => { console.log(song); this.currentSong = song});
    this.subscription.push(subscription);
  }

  async playSong(song: ISong) {
    await this.spotifyService.playSong(song.id);
    this.playerService.setCurrentSong(song);
  }

}
