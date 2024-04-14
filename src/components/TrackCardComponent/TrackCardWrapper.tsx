import { useAppDispatch } from "@/redux/store"
import { TrackCard, TrackCardProps } from "./TrackCard"
import { playTrack } from "@/redux/slices/playerSlice"
import { FunctionalComponent } from "preact"
import { Track, api } from "@/api"

export const TrackCardWrapper: FunctionalComponent<{ track: Track, contextQueue: Track[], selected?: boolean, search?: boolean, classes?: string }> = ({ track, contextQueue, selected, search, classes }) => {
    const dispatch = useAppDispatch()
    // const currentTrack = useAppSelector(state => state.player.queue.currentTrack)

    // const searchScopeTrack = useAppSelector(state => state.search.result.songs.find(t => t.uuid === track?.uuid))

    const liked = search ? (track.isLiked === true ? true : false) : false

    const props: TrackCardProps = {
        track,
        selected,
        classes,
        likeButton: search && !liked,
        trackCoverUrl: api.urlForTrackCoverById({ id: track.musicAlbum?.uuid }),
        onTrackClick: () => dispatch(playTrack({ track, continuePlaybackWithTracks: contextQueue })),
    }

    return <TrackCard {...props} />
}
