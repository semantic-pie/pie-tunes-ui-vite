import { useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import ArtistCard from "../common/ArtistCard";
import { useIsLoadNeedScroll } from "@/utils/useIsLoadNeedWithScroll";
import { useSearchQuery } from "@/utils/useSearchQuery";
import { fetchNextBandsPage } from "@/redux/slices/dataSlice";

const ArtistsPage = () => {
  const dispatch = useAppDispatch()

  const { changeSearchQuery, searchQuery } = useSearchQuery((query) => {
    console.log('search artists: ', query)
  })

  const artists = useAppSelector(state => searchQuery.length > 0 ? state.library.bands.all.filter(a => a.name.includes(searchQuery)) : state.library.bands.all)

  const { containerWithScrollRef } = useIsLoadNeedScroll(() => {
    dispatch(fetchNextBandsPage())
  })

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Artists</div>
        <SortByIcon />
      </div>
      <SearchBar query={searchQuery} setQuery={changeSearchQuery} />
      <div class='relative flex h-full w-full'>
        <div ref={containerWithScrollRef} class="absolute top-0 bottom-0 left-0 right-0 flex max-h-[100%] flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pr-[8px] mr-[-14px] gap-x-3 gap-y-3 overflow-y-scroll">
          {artists.map((a) => <ArtistCard band={a} />)}
        </div>
      </div>
    </>
  )
}

export default ArtistsPage;