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
      <div class='relative flex h-full'>
        <div class="absolute top-0 flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pr-[8px] mr-[-14px] gap-x-3 gap-y-3 overflow-y-scroll">
          {madeForYou.map((playlist) => <PlaylistCard onClick={() => nav({ to: '/library/made-for-you/' + playlist.uuid })} playlist={playlist} />)}
        </div>
      </div>
    </>
  )
}

export default MadeForYouPage;