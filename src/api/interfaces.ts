export interface Track {
  uuid: string
  liked: boolean
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

export interface SearchResult {
  tracks: Track[]
  albums: MusicAlbum[]
  bands: MusicBand[]
}

export interface Playlist {
  uuid: string
  name: string
  tracks: { track: Track }[]
}
