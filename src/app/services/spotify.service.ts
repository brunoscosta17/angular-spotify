import { Injectable } from '@angular/core';
import { SpotifyConfig } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../interfaces/IUser';
import { SpotifyArtistToArtist, SpotifyPlaylistToPlaylist, SpotifySinglePlaylistToPlaylist, SpotifyTrackToSong, SpotifyUserToUser } from '../commom/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/IArtist';
import { ISong } from '../interfaces/ISong';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = new Spotify();

  user!: IUser;

  constructor(private router: Router) { }

  async startUser() {
    if (!!this.user) return true;
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      this.setAccessToken(token!);
      await this.getSpotfyUser();
      return !!this.user;
    } catch (error) {
      return false;
    }
  }

  async getSpotfyUser(): Promise<any> {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserToUser(userInfo);
  }

  async getUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user?.id, { offset, limit});
    return playlists.items.map(SpotifyPlaylistToPlaylist);
  }

  async getPlaylistSongs(playlistId: string, offset: number = 0, limit: number = 50): Promise<IPlaylist> {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);
    const playlist = SpotifySinglePlaylistToPlaylist(playlistSpotify);
    const songs = this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.songs = (await songs).items.map(item => SpotifyTrackToSong(item.track as SpotifyApi.TrackObjectFull));
    return playlist;
  }

  async getTopArtists(limit = 10): Promise<IArtist[]> {
    const topArtists = await this.spotifyApi.getMyTopArtists({ limit });
    return topArtists.items.map(SpotifyArtistToArtist);
  }

  async searchForSongs(offset = 0, limit = 50): Promise<ISong[]> {
    const songs = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return songs.items.map(item => SpotifyTrackToSong(item.track));
  }

  async playSong(songId: string) {
    await this.spotifyApi.queue(songId);
    await this.spotifyApi.skipToNext();
  }

  getUrlLogin() {
    const authEndpoint = `${SpotifyConfig.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfig.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfig.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfig.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getUrlCallbackAccessToken() {
    if (!window.location.hash)
      return;
    const params = window.location.hash.substr(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  logout(offset = 0, limit = 50) {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  async getCurrentSong(): Promise<any>{
    const song = await this.spotifyApi.getMyCurrentPlayingTrack();
    if (song && song.item) return SpotifyTrackToSong(song.item);
  }

  async skipToPreviousSong() {
    await this.spotifyApi.skipToPrevious();
  }

  async skipToNextSong() {
    await this.spotifyApi.skipToNext();
  }

}
