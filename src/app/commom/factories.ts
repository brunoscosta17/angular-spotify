import { IArtist } from "../interfaces/IArtist";
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
