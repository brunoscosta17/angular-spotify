import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStepBackward, faStepForward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/commom/factories';
import { ISong } from 'src/app/interfaces/ISong';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  song: ISong = newSong();

  backwardIcon = faStepBackward;
  forwardIcon = faStepForward;
  playIcon = faPlay;
  pauseIcon = faPause;

  subscriptions: Subscription[] = [];

  constructor(
    private playerService: PlayerService,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getCurrentSong();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCurrentSong(): void {
    const subscription = this.playerService.currentSong.subscribe(currentSong => {
      this.song = currentSong;
    });
    this.subscriptions.push(subscription);
  }

  backSong(): void {
    this.spotifyService.skipToPreviousSong();
  }

  nextSong():void {
    this.spotifyService.skipToNextSong();
  }

  playSong(): void {
    this.spotifyService.playSong('play');
  }

  pauseSong(): void {
    this.spotifyService.playSong('pause');
  }

}
