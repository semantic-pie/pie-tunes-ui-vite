import { useAppSelector } from "@/redux/store";
import SortByIcon from "../icons/SortByIcon";
import PlaylistCard from "../common/PlaylistCard";
import { useNavigate } from "@tanstack/react-router";
import { ScrollAndLoadList } from "../ScrollAndLoadListComponent/ScrollAndLoadList";
import { PlaylistCardWrapper } from "../PlaylistCardComponent/PlaylistCardWrapper";

const MadeForYouPage = () => {
  const madeForYou = useAppSelector(state => state.library.playlist.madeForYou.all)

  const nav = useNavigate({ from: '/library/made-for-you' })

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Made For You</div>
        <SortByIcon />
      </div>

      <ScrollAndLoadList gridLayout  >
        {madeForYou.map(playlist => <PlaylistCardWrapper playlist={playlist} />)}
      </ScrollAndLoadList>
    </>
  )
}

export default MadeForYouPage;