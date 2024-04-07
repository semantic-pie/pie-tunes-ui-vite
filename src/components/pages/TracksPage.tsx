import { useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import TrackCard from "../common/TrackCard";
import { useIsLoadNeedScroll } from "@/utils/useIsLoadNeedWithScroll";
import { useSearchQuery } from "@/utils/useSearchQuery";
import { fetchForTrackSearchByTitle, fetchNextSongsPage } from "@/redux/slices/dataSlice";

const TracksPage = () => {
  const { changeSearchQuery, searchQuery } = useSearchQuery((query) => {
    dispatch(fetchForTrackSearchByTitle({ query }))
  })

  const { songs: { all, searched } } = useAppSelector(state => state.library)
  const tracks = searchQuery.length > 0 ? searched : all

  const dispatch = useAppDispatch()

  const { containerWithScrollRef } = useIsLoadNeedScroll(() => {
    dispatch(fetchNextSongsPage())
  })

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Songs</div>
        <SortByIcon />
      </div>
      <SearchBar query={searchQuery} setQuery={changeSearchQuery} />
      <div class='relative flex h-full'>
        <div ref={containerWithScrollRef} class={`absolute top-0 left-0 right-0 flex flex-col h-full pr-[8px] mr-[-14px] flex-1 gap-4 overflow-y-scroll`}>
          {tracks.map((track) => <TrackCard track={track} />)}
          {tracks.length === 0 && searchQuery.length === 0 && <span class='m-auto opacity-70'>You haven't added anything yet</span>}
          {tracks.length === 0 && searchQuery.length !== 0 && <span class='m-auto opacity-70'>Nothing found :(</span>}
        </div>
      </div>

    </>
  )
}

export default TracksPage;