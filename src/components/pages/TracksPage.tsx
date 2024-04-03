import { loadNextPage, searchTracksFetch, useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import TrackCard from "../common/TrackCard";
import { useIsLoadNeedScroll } from "@/utils/useIsLoadNeedWithScroll";
import { useSearchQuery } from "@/utils/useSearchQuery";


const TracksPage = () => {
  const { changeSearchQuery, searchQuery } = useSearchQuery((query) => {
    dispatch(searchTracksFetch(query))
  })

  const songs = useAppSelector(state => state.library.songs)
  const searched = useAppSelector(state => state.library.searchSongs)

  const tracks = searchQuery.length > 0 ? searched : songs

  const dispatch = useAppDispatch()

  const { containerWithScrollRef } = useIsLoadNeedScroll(() => {
    dispatch(loadNextPage())
  })

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Songs</div>
        <SortByIcon />
      </div>
      <SearchBar query={searchQuery} setQuery={changeSearchQuery} />
      <div ref={containerWithScrollRef} class={`flex flex-col max-h-[100%] pr-[8px] mr-[-14px] flex-1 gap-4 overflow-y-scroll`}>
        {tracks.map((track) => <TrackCard track={track} />)}
        {tracks.length === 0 && searchQuery.length === 0 && <span class='m-auto opacity-70'>You haven't added anything yet</span>}
        {tracks.length === 0 && searchQuery.length !== 0 && <span class='m-auto opacity-70'>Nothing found :(</span>}
      </div>
    </>
  )
}

export default TracksPage;