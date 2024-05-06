import { config } from "@/appConfiguration"
import buildUrl from "build-url-ts"

const { host, https} = config


const pieDomainHost = (https ? 'https' : 'http') + '://' + host.domain
const pieStreamingHost = (https ? 'https' : 'http') + '://' + host.streaming
const pieSnoopyHost= (https ? 'https' : 'http') + '://' + host.snoopy
const pieRecHost= (https ? 'https' : 'http') + '://' + host.rec

export type EventLike = {
    type: 'LIKE_ENTITY' | 'REMOVE_LIKE',
    entityUuid: string
}

export type EventBody = EventLike

export type FindByTitleParams = {
    page?: number
    limit?: number
    query: string
}

export type FindByDateParams = {
    page?: number
    limit?: number
    order?: 'asc' | 'desc'
}

export type FindById = {
    id: string | number
}

export type FindByUuid = {
    uuid: string
}

export type FindByUserUuid = {
    userUuid: string
}

export type FindByQuery = {
    q: string
}

export const api = {
    urlForGlobalSearch: ({ page, limit, query }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/search', { queryParams: { page, limit, q: query } })!,

    urlForTracksByUuid: ({ uuid }: FindByUuid) => buildUrl(pieDomainHost + '/api/v1/library/tracks/', { path: uuid })!,
    urlForTracksByTitle: ({ page, limit, query }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/tracks/find-by-title', { queryParams: { page, limit, q: query } })!,
    urlForTracksByDate: ({ page, limit, order }: FindByDateParams) => buildUrl(pieDomainHost + '/api/v1/library/tracks/find-by-date', { queryParams: { page: page, limit, order } })!,
    urlForTracksByAlbum: (params: FindByUuid) => buildUrl(pieDomainHost + '/api/v1/library/tracks/find-by-album', { path: params.uuid })!,
    urlForTracksByPlaylist: (params: FindByUuid) => buildUrl(pieRecHost + '/api/v1/recommendations/playlists/', { path: params.uuid })!,

    urlForArtistsByTitle: ({ page, limit, query }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/artists/find-by-title', { queryParams: { page: page, limit, q: query } })!,
    urlForArtistsByDate: ({ page, limit, order }: FindByDateParams) => buildUrl(pieDomainHost + '/api/v1/library/artists/find-by-date', { queryParams: { page: page, limit, order } })!,
    urlForArtistsByUuid: ({ uuid }: FindByUuid) => buildUrl(pieDomainHost + '/api/v1/library/artists/', { path: uuid})!,

    urlForAlbumsByTitle: ({ page, limit, query }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/albums/find-by-title', { queryParams: { page: page, limit, q: query } })!,
    urlForAlbumsByDate: ({ page, limit, order }: FindByDateParams) => buildUrl(pieDomainHost + '/api/v1/library/albums/find-by-date', { queryParams: { page: page, limit, order } })!,
    urlForAlbumsByUuid: ({ uuid }: FindByUuid) => buildUrl(pieDomainHost + '/api/v1/library/albums/', { path: uuid })!,


    urlForPlaylistsByDate: () => buildUrl(pieRecHost + '/api/v1/recommendations/playlists/daily-mix/find-by-date')!,
    urlForGenrePlaylistsByDate: () => buildUrl(pieRecHost + '/api/v1/recommendations/playlists/genre-mix/find-by-date')!,
    urlForPlaylistGenerate: () => buildUrl(pieRecHost + '/api/v1/recommendations/playlists/generate')!,

    urlForTrackStreamById: ({ id }: FindById) => buildUrl(pieStreamingHost + '/api/play', { path: id + '.mp3' })!,
    urlForTrackCoverById: ({ id }: FindById) => buildUrl(pieStreamingHost + '/api/tracks/covers', { path: id })!,

    urlForSingleUpload: () => pieDomainHost + '/api/track-loader/upload-one',

    urlForLike: () => pieDomainHost + '/api/tracks/events',
    urlForEvents: () => pieDomainHost + '/api/tracks/events',

    urlForTracksDeprecated: ({ page, limit }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/tracks', { queryParams: { page: page, limit } })!,
    urlForArtistsDeprecated: ({ page, limit }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/artists', { queryParams: { page: page, limit } })!,
    urlForAlbumsDeprecated: ({ page, limit }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/albums', { queryParams: { page: page, limit } })!,

    urlForSnoopySearch: ({ q }: FindByQuery) => buildUrl(pieSnoopyHost + '/api/v1/snoopy/search', { queryParams: { q } })!,
    urlForSnoopyUpload: ({ query }: {query: string}) => buildUrl(pieSnoopyHost + '/api/v1/snoopy/spotify/download', { queryParams: { query } })!,

    urlForAuthSignUp: () => buildUrl(pieDomainHost + '/api/v1/auth/signup')!,
    urlForAuthLogin: () => buildUrl(pieDomainHost + '/api/v1/auth/login')!,
    urlForPreferredGenres: () => buildUrl(pieDomainHost + '/api/v1/domain/users/add-genres')!,
    urlForUser: () => buildUrl(pieDomainHost + '/api/v1/domain/users')!,
}
