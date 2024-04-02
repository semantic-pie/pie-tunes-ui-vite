import { useAppSelector } from "@/redux/store";
import SortByIcon from "../icons/SortByIcon";
import PlaylistCard from "../common/PlaylistCard";
import { useNavigate } from "@tanstack/react-router";

const MadeForYouPage = () => {
  const madeForYou = useAppSelector(state => state.library.playlists.madeForYou)

  const nav = useNavigate({ from: '/library/made-for-you' })

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Made For You</div>
        <SortByIcon />
      </div>
      <div class="flex max-h-[100%] flex-col sm:flex-row sm:flex-wrap gap-x-3 gap-y-3 overflow-y-scroll">
        {madeForYou.map((playlist) => <PlaylistCard onClick={() => nav({ to: '/library/made-for-you/' + playlist.uuid })} playlist={playlist} />)}
      </div>
    </>
  )
}

export default MadeForYouPage;