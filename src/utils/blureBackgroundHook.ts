import { api } from "@/api"
import { useAppSelector } from "@/redux/store"
import { useEffect } from "preact/hooks"

export const blureBackgroundHook = () => {
    const track = useAppSelector(state => state.player.queue.currentTrack)

    useEffect(() => {
        if (track) {
            // const html = document.getElementsByTagName('html')[0]
            const html = document.getElementById('bgCover')!
            html.style.backgroundImage = `url('${api.urlForTrackCoverById({id: track.album.uuid})}')`  
            html.style.filter = 'blur(200px)'
        }
        
    }, [track])

}
