import { Component, OnDestroy, OnInit } from '@angular/core';
import { newSong } from 'src/app/commom/factories';
import { ISong } from 'src/app/interfaces/ISong';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit, OnDestroy {

  bannerImageUrl = '';
  bannerText = 'Songs List';
  songs: ISong[] = [];
  currentSong: ISong = newSong();
  playIcon = faPlay;
  subscriptions: Subscription[] = [];
  title = '';
  faPlay = faPlay;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    const sub = this.activatedRoute.paramMap.subscribe(async params => {
      const type = params.get('type') ?? '';
      const id = params.get('id') ?? '';
      await this.getRouteData(type, id);
    }
    );
    this.getSongsList();
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getSongsList(): void {}

  setPageData(songs: ISong[], imageUrl: string, text: string): void {
    this.songs = songs;
    this.bannerImageUrl = imageUrl;
    this.bannerText = text;
  }

  getArtists(song: ISong): string {
    return song.artists.map(artist => artist.name).join(', ');
  }

  getCurrentSong(): void {
    const subscription = this.playerService.currentSong.subscribe(currentSong => {
      this.currentSong = currentSong;
    });
    this.subscriptions.push(subscription);
  }

  async getRouteData(type: string, id: string): Promise<void> {
    switch (type) {
      case 'playlist':
        await this.getPlaylistData(id);
        break;
      case 'artist':
        await this.getArtistData(id);
        break;
    }
  }

  async getPlaylistData(playlistId: string): Promise<void> {
    const playlistSongs = await this.spotifyService.getPlaylistSongs(playlistId);
    if (playlistSongs && playlistSongs.songs) {
      this.setPageData(playlistSongs.songs, playlistSongs.imageUrl, playlistSongs.name);
      this.title = 'Músicas Playlist: ' + playlistSongs.name;
    }
  }

  async getArtistData(artistId: string): Promise<void> {}

  async playSong(song: ISong) {
    await this.spotifyService.playSong(song.id);
    this.playerService.setCurrentSong(song);
  }

}
