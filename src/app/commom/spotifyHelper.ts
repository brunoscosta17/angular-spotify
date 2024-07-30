import { addMilliseconds, format } from "date-fns";
import { IArtist } from "../interfaces/IArtist";
import { IPlaylist } from "../interfaces/IPlaylist";
import { ISong } from "../interfaces/ISong";
import { IUser } from "../interfaces/IUser";
import { newPlaylist, newSong } from "./factories";

export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
  return {
    id: user.id,
    name: user.display_name!,
    urlImage: user.images?.pop()?.url!
  }
}

export function SpotifyPlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images?.pop()?.url!
  }
}

export function SpotifySinglePlaylistToPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
  if(!playlist) return newPlaylist();
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images?.shift()?.url!,
    songs: []
  }
}

export function SpotifyArtistToArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): IArtist {
  return {
    id: spotifyArtist.id,
    name: spotifyArtist.name,
    imageUrl: spotifyArtist.images?.sort((a, b) => (a.width ?? 0) - (b.width ?? 0)).pop()?.url ?? '',
  }
}

export function SpotifyTrackToSong(spotifyTrack: SpotifyApi.TrackObjectFull): ISong {

  if (!spotifyTrack) {
    throw newSong();
  }

  const msToMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  };
  return {
    id: spotifyTrack.uri,
    name: spotifyTrack.name,
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    album: {
      id: spotifyTrack.album.id,
      imageUrl: spotifyTrack.album.images?.sort((a, b) => (a.width ?? 0) - (b.width ?? 0)).pop()?.url ?? '',
      name: spotifyTrack.album.name
    },
    duration: msToMinutes(spotifyTrack.duration_ms)
  }
}

export function MilisecondsToMinutes(miliseconds: number): string {
  const minutes = Math.floor(miliseconds / 60000);
  const seconds = ((miliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
}
