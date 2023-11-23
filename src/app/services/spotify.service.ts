import { Injectable } from '@angular/core';
import { SpotifyConfig } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../interfaces/IUser';
import { SpotifyUserToUser } from '../commom/spotifyHelper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = new Spotify();

  user!: IUser;

  constructor() { }

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
    console.log('user', userInfo);
    this.user = SpotifyUserToUser(userInfo);
    console.log('user', this.user);
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
    console.log(params);
    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

}
