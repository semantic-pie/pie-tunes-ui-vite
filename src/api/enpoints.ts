import { config } from "@/appConfiguration"

const { host, port } = config

export const api = {
    forTracks: () => `http://${host.domain}:${port.domain}/api/tracks`,
    forTrackStream: (id: string | number) => `http://${host.streaming}:${port.streaming}/api/play/${id}.mp3`,
    forTrackCover: (id: string | number) => `http://${host.streaming}:${port.streaming}/api/tracks/covers/${id}`
}

