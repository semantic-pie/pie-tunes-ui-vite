import { Playlist, api } from "@/api"
import { trancate } from "@/utils/hellpers"
import { useNavigate } from "@tanstack/react-router"


type PlaylistCardProps = {
   playlist: Playlist 
}
const PlaylistCard = (props: PlaylistCardProps) => {
    const nav = useNavigate({ from: '/library/albums' })
//onClick={() => nav({ to: '/library/albums/$albumId', params: { albumId: props.playlist.uuid } })}
    return (
        <div  class="flex flex-shrink-0 gap-3 sm:flex-col cursor-pointer">
            <img class="w-20 h-20 sm:w-52 sm:h-52 rounded-md overflow-hidden bg-slate-200 bg-opacity-15" src={'/src/assets/dailymixpic.jpeg'} alt="" />
            <div class="sm:w-52">
                <div class="text-start text-white text-base font-normal capitalize truncate ...">{trancate(props.playlist.name, 28)}</div>
            </div>
        </div>
    )
}

export default PlaylistCard