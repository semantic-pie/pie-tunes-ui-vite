import { loadNextPageAlbums, useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import AlbumCard from "../common/AlbumCard";
import { useIsLoadNeedScroll } from "@/utils/useIsLoadNeedWithScroll";
import { useSearchQuery } from "@/utils/useSearchQuery";
import { useEffect } from "preact/hooks";

const AlbumsPage = () => {
  const { changeSearchQuery, searchQuery } = useSearchQuery((query) => {
    console.log('search albums: ', query)
    // dispatch(searchAlbumsFetch(query))
  })

  const libraryAlbums = useAppSelector(state => state.library.albums)
  // const searched = useAppSelector(state => state.library.searchAlbums)
  const albums = libraryAlbums

  const dispatch = useAppDispatch()

  const { containerWithScrollRef, scrollPosition } = useIsLoadNeedScroll(() => {
    dispatch(loadNextPageAlbums())
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
      <div class='relative flex h-full'>
        <div ref={containerWithScrollRef} class="absolute top-0 bottom-0 left-0 right-0 flex max-h-[100%] flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pr-[8px] mr-[-14px] gap-x-3 gap-y-3 overflow-y-scroll">
          {albums.map((album) => <AlbumCard album={album} />)}
        </div>
      </div>
    </>
  )
}

export default AlbumsPage;