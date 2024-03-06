
export const api = {
    forTracks: () => `http://localhost:8080/api/tracks`,
    forTrackStream: (id: string | number) => `http://localhost:8080/api/play/${id}.mp3`,
    forTrackCover: (id: string | number) => `http://localhost:8080/api/tracks/covers/${id}`
}

