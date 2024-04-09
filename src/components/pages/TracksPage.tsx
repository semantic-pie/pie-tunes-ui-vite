import { useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import { useSearchQuery } from "@/utils/useSearchQuery";
import { fetchForTrackSearchByTitle, fetchNextSongsPage } from "@/redux/slices/dataSlice";
import { TrackCardWrapper } from "../TrackCardComponent/TrackCardWrapper";
import { ScrollAndLoadList } from "../ScrollAndLoadListComponent/ScrollAndLoadList";

const TracksPage = () => {
  const { changeSearchQuery, searchQuery } = useSearchQuery((query) => {
    dispatch(fetchForTrackSearchByTitle({ query }))
  })

  const { songs: { all, searched } } = useAppSelector(state => state.library)
  const tracks = searchQuery.length > 0 ? searched : all
  const currentTrack = useAppSelector(state => state.player.queue.currentTrack)

  const dispatch = useAppDispatch()

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Songs</div>
        <SortByIcon />
      </div>
      <SearchBar query={searchQuery} setQuery={changeSearchQuery} />
      <ScrollAndLoadList onLoadNeed={() => dispatch(fetchNextSongsPage())} >
        {tracks.map(song => <TrackCardWrapper track={song} contextQueue={tracks} selected={song.uuid === currentTrack?.uuid} />)}
      </ScrollAndLoadList>
    </>
  )
}

export default TracksPage;