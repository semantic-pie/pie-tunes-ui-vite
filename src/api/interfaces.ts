export interface Track {
    uuid: string
    isLiked: boolean
    version: number
    title: string
    releaseYear: any
    bitrate: number
    lengthInMilliseconds: number
    playlist: any
    genres: Genre[]
    band: MusicBand
    album: MusicAlbum
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
  