import { useAppDispatch } from "@/redux/store"
import { TrackCard, TrackCardProps } from "./TrackCard"
import { playTrack } from "@/redux/slices/playerSlice"
import { FunctionalComponent } from "preact"
import { Track, api } from "@/api"
import { fetchForLike } from "@/redux/slices/userSlice"

export const TrackCardWrapper: FunctionalComponent<{ track: Track, contextQueue: Track[], selected?: boolean, search?: boolean, classes?: string }> = ({ track, contextQueue, selected, search, classes }) => {
    const dispatch = useAppDispatch()

    const props: TrackCardProps = {
        track,
        selected,
        classes,
        likeButton: !track.isLiked,
        trackCoverUrl: api.urlForTrackCoverById({ id: track.musicAlbum?.uuid }),
        onTrackClick: () => dispatch(playTrack({ track, continuePlaybackWithTracks: contextQueue })),
        onTrackLike: () => dispatch(fetchForLike({ track }))
    }

    return <TrackCard {...props} />
}
