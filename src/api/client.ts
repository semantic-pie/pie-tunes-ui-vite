import { responseToPieApiResponse } from "@/utils/hellpers"
import { EventBody, FindByDateParams, FindByQuery, FindByTitleParams, FindByUserUuid, FindByUuid, MusicAlbum, MusicBand, Playlist, SearchResult, Track, api } from "."


export interface PieApiResponse<T> {
    data: T
    meta: {
        status: number
        xTotalCount: number
    }
}

export type SearchResponse = {
    uuid: string
    name: string
    entity_type: 'BAND' | 'ALBUM' | 'TRACK'
    bandName: string
}
export type SearchResponseRoot = {
    tracks: SearchResponse[]
    albums: SearchResponse[]
    bands: SearchResponse[]
}

export type SnoopySearchTrack = {
    id: string
    title: string
    lengthInMilliseconds: number
    bandName: string
    coverUrl: string
}

interface PieApiClient {
    findTrackByUuid: (params: FindByUuid) => Promise<PieApiResponse<Track>>
    findTrackByTitle: (params: FindByTitleParams) => Promise<PieApiResponse<Track[]>>
    findTrackByDate: (params: FindByDateParams) => Promise<PieApiResponse<Track[]>>
    findTrackByAlbum: (params: FindByUuid) => Promise<PieApiResponse<Track[]>>
    findTrackByPlaylist: (params: FindByUuid) => Promise<PieApiResponse<Playlist>>
    findTrackDeprecated: (params: FindByTitleParams) => Promise<PieApiResponse<Track[]>>

    findPlaylistsByDate: (params: FindByUserUuid) => Promise<PieApiResponse<Playlist[]>>

    findAlbumsByTitle: (params: FindByTitleParams) => Promise<PieApiResponse<MusicAlbum[]>>
    findAlbumsByDate: (params: FindByDateParams) => Promise<PieApiResponse<MusicAlbum[]>>
    findAlbumsDeprecated: (params: FindByTitleParams) => Promise<PieApiResponse<MusicAlbum[]>>

    findArtistsByTitle: (params: FindByTitleParams) => Promise<PieApiResponse<MusicBand[]>>
    findArtistsByDate: (params: FindByDateParams) => Promise<PieApiResponse<MusicBand[]>>
    findArtistsDeprecated: (params: FindByTitleParams) => Promise<PieApiResponse<MusicBand[]>>

    searchByTitle: (params: FindByTitleParams & { controller: AbortController }) => Promise<PieApiResponse<SearchResult>>

    uploadMp3: (body: FormData) => Promise<any>

    postEvent: (body: EventBody) => Promise<PieApiResponse<void>>
    searchSnoopy: (params: FindByQuery) => Promise<PieApiResponse<SnoopySearchTrack[]>>
    uploadSnoopy: (params: { query: string }) => Promise<PieApiResponse<any>>
}

const get = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

const postWithBody = (body: any) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

export const pieApiClient: PieApiClient = {
    findTrackByUuid: async (params) =>
        fetch(api.urlForTracksByUuid(params), get)
            .then(responseToPieApiResponse),
    findTrackByTitle: async (params) =>
        fetch(api.urlForTracksByTitle(params), get)
            .then(responseToPieApiResponse),
    findTrackByDate: async (params) =>
        fetch(api.urlForTracksByDate(params), get)
            .then(responseToPieApiResponse),
    findTrackByAlbum: async (params) =>
        fetch(api.urlForTracksByAlbum(params), get)
            .then(responseToPieApiResponse),
    findTrackByPlaylist: async (params) =>
        fetch(api.urlForTracksByPlaylist(params), get)
            .then(responseToPieApiResponse),
    findTrackDeprecated: async (params) =>
        fetch(api.urlForTracksDeprecated(params), get)
            .then(responseToPieApiResponse),
    findPlaylistsByDate: async (params) =>
        fetch(api.urlForPlaylistsByDate(params), get)
            .then(responseToPieApiResponse),
    findAlbumsByTitle: async (params) =>
        fetch(api.urlForAlbumsByTitle(params), get)
            .then(responseToPieApiResponse),
    findAlbumsByDate: async (params) =>
        fetch(api.urlForAlbumsByDate(params), get)
            .then(responseToPieApiResponse),
    findAlbumsDeprecated: async (params) =>
        fetch(api.urlForAlbumsDeprecated(params), get)
            .then(responseToPieApiResponse),
    findArtistsByTitle: async (params) =>
        fetch(api.urlForArtistsByTitle(params), get)
            .then(responseToPieApiResponse),
    findArtistsByDate: async (params) =>
        fetch(api.urlForArtistsByDate(params), get)
            .then(responseToPieApiResponse),
    findArtistsDeprecated: async (params) =>
        fetch(api.urlForArtistsDeprecated(params), get)
            .then(responseToPieApiResponse),
    uploadMp3: async (body) =>
        fetch(api.urlForSingleUpload(), { method: 'POST', body })
            .then(responseToPieApiResponse),
    postEvent: async (body) =>
        fetch(api.urlForLike(), postWithBody(body))
            .then(responseToPieApiResponse),
    searchByTitle: async (params) =>
        fetch(api.urlForGlobalSearch(params), { ...get, signal: params.controller.signal })
            .then(responseToPieApiResponse),
    searchSnoopy: async (params) =>
        fetch(api.urlForSnoopySearch(params), get)
            .then(responseToPieApiResponse),
    uploadSnoopy: async (params) =>
        fetch(api.urlForSnoopyUpload(params), get)
            .then(responseToPieApiResponse),
}
