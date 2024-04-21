import { FunctionalComponent } from "preact"
import { useNavigate } from "@tanstack/react-router"
import { SidePill, SidePillProps } from "./SidePill"
import { useAppSelector } from "@/redux/store"

export const SidePillWrapper: FunctionalComponent = () => {
    const nav = useNavigate()
    const currentTrack = useAppSelector(state => state.player.queue.currentTrack)

    const props: SidePillProps = {
        currentTrack,
        onLibraryClick: () => nav({to: '/library/songs'}),
        onPlayerClick: () => nav({to: '/player'}),
        onSearchClick: () => nav({to: '/search'}),
    }

    return <SidePill {...props} />
}
