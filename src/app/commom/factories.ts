import { IArtist } from "../interfaces/IArtist";
import { IPlaylist } from "../interfaces/IPlaylist";
import { ISong } from "../interfaces/ISong";

export function newArtist(): IArtist {
    return {
        id: "",
        name: "",
        imageUrl: "",
    };
}

export function newSong(): ISong {
    return {
        id: "",
        album: {
          id: "",
          imageUrl: "",
          name: "",
        },
        artists: [],
        duration: "",
        name: "",
    };
}

export function newPlaylist(): IPlaylist {
    return {
        id: "",
        imageUrl: "",
        name: "",
        songs: []
    };
}
