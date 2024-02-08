import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISong } from '../interfaces/ISong';
import { newSong } from '../commom/factories';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentSong = new BehaviorSubject<ISong>(newSong());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentSong();
  }

  async getCurrentSong() {
    clearTimeout(this.timerId);
    const song = await this.spotifyService.getCurrentSong();
    this.setCurrentSong(song);
    this.timerId = setInterval(async () => {
      await this.getCurrentSong();
    }, 3000);
  }

  setCurrentSong(song: ISong) {
    this.currentSong.next(song);
  }

}
