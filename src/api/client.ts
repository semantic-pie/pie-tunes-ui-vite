import { responseToPieApiResponse } from "@/utils/hellpers"
import { EventBody, FindByDateParams, FindByTitleParams, MusicAlbum, MusicBand, Track, api } from "."


export interface PieApiResponse<T> {
    data: T
    meta: {
        status: number
        xTotalCount: number
    }
}

interface PieApiClient {
    findTrackByTitle: (params: FindByTitleParams) => Promise<PieApiResponse<Track[]>>
    findTrackByDate: (params: FindByDateParams) => Promise<PieApiResponse<Track[]>>
    findTrackDeprecated: (params: FindByTitleParams) => Promise<PieApiResponse<Track[]>>

    findAlbumsByTitle: (params: FindByTitleParams) => Promise<PieApiResponse<MusicAlbum[]>>
    findAlbumsByDate: (params: FindByDateParams) => Promise<PieApiResponse<MusicAlbum[]>>
    findAlbumsDeprecated: (params: FindByTitleParams) => Promise<PieApiResponse<MusicAlbum[]>>

    findArtistsByTitle: (params: FindByTitleParams) => Promise<PieApiResponse<MusicBand[]>>
    findArtistsByDate: (params: FindByDateParams) => Promise<PieApiResponse<MusicBand[]>>
    findArtistsDeprecated: (params: FindByTitleParams) => Promise<PieApiResponse<MusicAlbum[]>>


    uploadMp3: (body: FormData) => Promise<PieApiResponse<string>>

    postEvent: (body: EventBody) => Promise<PieApiResponse<void>>
}

const get = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

const postWithBody = (body: any) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

export const pieApiClient: PieApiClient = {
    findTrackByTitle: async (params) =>
        fetch(api.urlForTracksByTitle(params), get)
            .then(responseToPieApiResponse),
    findTrackByDate: async (params) =>
        fetch(api.urlForTracksByDate(params), get)
            .then(responseToPieApiResponse),
    findTrackDeprecated: async (params) =>
        fetch(api.urlForTracksDeprecated(params), get)
            .then(responseToPieApiResponse),
    findAlbumsByTitle: async (params) =>
        fetch(api.urlForAlbumsByTitle(params), get)
            .then(responseToPieApiResponse),
    findAlbumsByDate: async (params) =>
        fetch(api.urlForAlbumsByDate(params), get)
            .then(responseToPieApiResponse),
    findAlbumsDeprecated: async (params) =>
        fetch(api.urlForArtistsDeprecated(params), get)
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
        fetch(api.urlForSingleUpload(), postWithBody(body))
            .then(responseToPieApiResponse),
}
