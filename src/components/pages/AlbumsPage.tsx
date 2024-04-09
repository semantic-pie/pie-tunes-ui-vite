import { useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import { useIsLoadNeedScroll } from "@/utils/useIsLoadNeedWithScroll";
import { useSearchQuery } from "@/utils/useSearchQuery";
import { useEffect } from "preact/hooks";
import { fetchNextAlbumsPage } from "@/redux/slices/dataSlice";
import { ScrollAndLoadList } from "../ScrollAndLoadListComponent/ScrollAndLoadList";
import { AlbumCardWrapper } from "../AlbumCardComponent/AlbumCardWrapper";

const AlbumsPage = () => {
  const { changeSearchQuery, searchQuery } = useSearchQuery((query) => {
    console.log('search albums: ', query)
    // dispatch(searchAlbumsFetch(query))
  })

  const libraryAlbums = useAppSelector(state => state.library.albums.all)
  // const searched = useAppSelector(state => state.library.searchAlbums)
  const albums = libraryAlbums

  const dispatch = useAppDispatch()

  const { containerWithScrollRef, scrollPosition } = useIsLoadNeedScroll(() => {
    dispatch(fetchNextAlbumsPage())
  })

  useEffect(() => {
    containerWithScrollRef.current?.scrollTo({ top: scrollPosition })
  }, [])

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Albums</div>
        <SortByIcon />
      </div>
      <SearchBar query={searchQuery} setQuery={changeSearchQuery} />

      <ScrollAndLoadList onLoadNeed={() => dispatch(fetchNextAlbumsPage())} gridLayout  >
        {albums.map(album => <AlbumCardWrapper album={album}  />)}
      </ScrollAndLoadList>
    </>
  )
}

export default AlbumsPage;