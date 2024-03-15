export interface Track {
    uuid: string
    version: number
    title: string
    releaseYear: any
    bitrate: number
    lengthInMilliseconds: number
    playlist: any
    genres: Genre[]
    musicBand: MusicBand
    musicAlbum: MusicAlbum
  }
  
  export interface Genre {
    uuid: string
    version: number
    name: string
  }
  
  export interface MusicBand {
    uuid: string
    version: number
    name: string
    description: any
  }
  
  export interface MusicAlbum {
    uuid: string
    version: number
    name: string
    description: any
    yearOfRecord: number
  }
  