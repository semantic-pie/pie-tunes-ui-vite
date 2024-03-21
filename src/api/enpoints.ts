import { config } from "@/appConfiguration"

const { host, port } = config

export type LikeTrackBody = {
    type: 'LIKE_TRACK',
    trackUuid: string,
    userUuid: string
}

export const api = {
    forTracks: (props: {page: number; limit: number}) => `http://${host.domain}:${port.domain}/api/tracks?page=${props.page}&limit=${props.limit}`,
    forTrackStream: (id: string | number) => `http://${host.streaming}:${port.streaming}/api/play/${id}.mp3`,
    forTrackCover: (id: string | number) => `http://${host.streaming}:${port.streaming}/api/tracks/covers/${id}`,
    forUpload: () => `http://${host.domain}:${port.domain}/api/track-loader/upload`,
    forArtsits: (props: {page: number; limit: number}) => `http://${host.domain}:${port.domain}/api/artists?page=${props.page}&limit=${props.limit}`,
    forAlbums: (props: {page: number; limit: number, query?: string}) => `http://${host.domain}:${port.domain}/api/albums?page=${props.page}&limit=${props.limit}${props.query ? '&q=' + props.query : ''}`,
    forLike: () => `http://${host.domain}:${port.domain}/api/tracks/events`
}

