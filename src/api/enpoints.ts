import { config } from "@/appConfiguration"
import buildUrl from "build-url-ts"

const { host, https} = config


const pieDomainHost = (https ? 'https' : 'http') + '://' + host.domain
const pieStreamingHost = (https ? 'https' : 'http') + '://' + host.streaming
const pieSnoopyHost= (https ? 'https' : 'http') + '://' + host.snoopy

export type LikeTrackBody = {
    type: 'LIKE_TRACK',
    trackUuid: string,
    userUuid: string
}

export type FindByTitleParams = {
    page?: number
    limit?: number
    query: string
    userUuid?: string
}

export type FindByDateParams = {
    page?: number
    limit?: number
    order?: 'asc' | 'desc'
    userUuid?: string
}

export type EventBody = {
    type: "LIKE_TRACK" | "REMOVE_LIKE"
    track_uuid: string,
    user_uuid: string
}


export type FindById = {
    id: string | number
}

export type FindByUuid = {
    uuid: string
}

export type FindByQuery = {
    q: string
}

// export const api = {
//     forTracks: (props: {page: number; limit: number; query?: string}) => `http://${host.domain}:${port.domain}/api/tracks?page=${props.page}&limit=${props.limit}${props.query ? '&q=' + props.query : ''}`,
//     forTrackStream: (id: string | number) => `http://${host.streaming}:${port.streaming}/api/play/${id}.mp3`,
//     forTrackCover: (id: string | number) => `http://${host.streaming}:${port.streaming}/api/tracks/covers/${id}`,
//     forUpload: () => `http://${host.domain}:${port.domain}/api/track-loader/upload-one`,
//     forArtsits: (props: {page: number; limit: number}) => `http://${host.domain}:${port.domain}/api/artists?page=${props.page}&limit=${props.limit}`,
//     forAlbums: (props: {page: number; limit: number, query?: string}) => `http://${host.domain}:${port.domain}/api/albums?page=${props.page}&limit=${props.limit}${props.query ? '&q=' + props.query : ''}`,
//     forLike: () => `http://${host.domain}:${port.domain}/api/tracks/events`
// }

export const api = {
    urlForGlobalSearch: ({ page, limit, query, userUuid }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/search', { queryParams: { page, limit, q: query, userUuid } })!,

    urlForTracksByUuid: ({ uuid }: FindByUuid) => buildUrl(pieDomainHost + '/api/v1/library/tracks/', { path: uuid })!,
    urlForTracksByTitle: ({ page, limit, query, userUuid }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/tracks/find-by-title', { queryParams: { page: page, limit, q: query, userUuid } })!,
    urlForTracksByDate: ({ page, limit, order, userUuid }: FindByDateParams) => buildUrl(pieDomainHost + '/api/v1/library/tracks/find-by-date', { queryParams: { page: page, limit, order, userUuid } })!,
    urlForTracksByAlbum: (params: FindByUuid) => buildUrl(pieDomainHost + '/api/v1/library/tracks/find-by-album', { path: params.uuid })!,

    urlForArtistsByTitle: ({ page, limit, query, userUuid }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/artists/find-by-title', { queryParams: { page: page, limit, q: query, userUuid } })!,
    urlForArtistsByDate: ({ page, limit, order, userUuid }: FindByDateParams) => buildUrl(pieDomainHost + '/api/v1/library/artists/find-by-date', { queryParams: { page: page, limit, order, userUuid } })!,

    urlForAlbumsByTitle: ({ page, limit, query, userUuid }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/albums/find-by-title', { queryParams: { page: page, limit, q: query, userUuid } })!,
    urlForAlbumsByDate: ({ page, limit, order, userUuid }: FindByDateParams) => buildUrl(pieDomainHost + '/api/v1/library/albums/find-by-date', { queryParams: { page: page, limit, order, userUuid } })!,


    urlForTrackStreamById: ({ id }: FindById) => buildUrl(pieStreamingHost + '/api/play', { path: id + '.mp3' })!,
    urlForTrackCoverById: ({ id }: FindById) => buildUrl(pieStreamingHost + '/api/tracks/covers', { path: id })!,

    urlForSingleUpload: () => pieDomainHost + '/api/track-loader/upload-one',

    urlForLike: () => pieDomainHost + '/api/tracks/events',

    urlForTracksDeprecated: ({ page, limit }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/tracks', { queryParams: { page: page, limit } })!,
    urlForArtistsDeprecated: ({ page, limit }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/artists', { queryParams: { page: page, limit } })!,
    urlForAlbumsDeprecated: ({ page, limit }: FindByTitleParams) => buildUrl(pieDomainHost + '/api/v1/library/albums', { queryParams: { page: page, limit } })!,

    urlForSnoopySearch: ({ q }: FindByQuery) => buildUrl(pieSnoopyHost + '/api/v1/snoopy/search', { queryParams: { q } })!,
    urlForSnoopyUpload: ({ query }: {query: string}) => buildUrl(pieSnoopyHost + '/api/v1/snoopy/spotify/download', { queryParams: { query } })!,
}
// http://192.168.192.70:8886/api/v1/snoopy/search?q=l
