export interface Track {
  uuid: string
  isLiked: boolean
  version: number
  title: string
  releaseYear: any
  bitrate: number
  lengthInMilliseconds: number
  playlist: any
  genres: string[]
  musicBand: MusicBand
  musicAlbum: MusicAlbum
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
  musicBand?: MusicBand
  tracks?: Track[]
}

export interface SearchResult {
  tracks: Track[]
  albums: MusicAlbum[]
  bands: MusicBand[]
}

export interface Playlist {
  uuid: string
  name: string
  tracks: Track[]
}
