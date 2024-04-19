import { useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import { useSearchQuery } from "@/utils/useSearchQuery";
import { fetchNextBandsPage } from "@/redux/slices/dataSlice";
import { ScrollAndLoadList } from "../ScrollAndLoadListComponent/ScrollAndLoadList";
import { ArtistCardWrapper } from "../ArtistCardComponent/ArtistCardWrapper";

const ArtistsPage = () => {
  const dispatch = useAppDispatch()

  const { changeSearchQuery, searchQuery } = useSearchQuery((query) => {
    console.log('search artists: ', query)
  })

  const artists = useAppSelector(state => searchQuery.length > 0 ? state.library.bands.all.filter(a => a.name.includes(searchQuery)) : state.library.bands.all)

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Artists</div>
        <SortByIcon />
      </div>
      <SearchBar query={searchQuery} setQuery={changeSearchQuery} />

      <ScrollAndLoadList onLoadNeed={() => dispatch(fetchNextBandsPage())} gridLayout  >
        {artists.map(artist => <ArtistCardWrapper artist={artist} />)}
      </ScrollAndLoadList>
    </>
  )
}

export default ArtistsPage;