import { Playlist, Track } from "@/api";

export const doNothing = () => { }

export const repeat = (obj: any, repeats: number) : any[] => {
    return Array(repeats).fill(obj)
}

export const testPLaylist: Playlist = {
    name: 'Playlist Kek',
    tracks: [],
    uuid: 'kek'
}
export const testTrack: Track = {
    uuid: "905171cb-3681-4265-a525-10aa7fe29770",
    title: "run for the sky",
    releaseYear: "2021",
    bitrate: 128,
    lengthInMilliseconds: 255048,
    genres: [ "chill-breakcore" ],
    musicBand: {
        uuid: "2c3264ca-3d19-43e0-b78c-80bc9edb8d65",
        name: "Deathbrain",
        version: 0,
        description: null
    },
    isLiked: false,
    version: 0,
    playlist: undefined,
    musicAlbum: {
        uuid: "1a626384-7c4d-4ee3-ba6e-3fdc9fb24ef2",
        name: "fantasy noises & perfect delusion",
        description: null,
        version: 0,
        yearOfRecord: 0,
        // band: {
        //     uuid: "2c3264ca-3d19-43e0-b78c-80bc9edb8d65",
        //     name: "Kevin Penkin",
        //     description: null
        // }
    }
}
