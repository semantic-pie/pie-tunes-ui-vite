import { loadNextPageAlbums, searchAlbumsFetch, useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import AlbumCard from "../common/AlbumCard";
import { Outlet } from "@tanstack/react-router";
import { albumViewRoute } from "@/router/library";
import { useEffect, useRef, useState } from "preact/hooks";

const AlbumsPage = () => {
  const { albumId } = albumViewRoute.useParams()

  const [query, setQury] = useState<string>('')

  const scrollPosition = useRef<number>(0)

  const changeQuery = (q: string) => {
    dispatch(searchAlbumsFetch(q))
    setQury(q)
  }

  const libraryAlbums = useAppSelector(state => state.library.albums)
  const searched = useAppSelector(state => state.library.searchAlbums)

  const albums = query.length > 0 ? searched : libraryAlbums

  const [isLoadNeed, setIsLoadNeed] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (isLoadNeed) {
      dispatch(loadNextPageAlbums())
      setTimeout(() => {
        setIsLoadNeed(false)
      }, 200)

    }
  }, [isLoadNeed])


  const handleScroll = () => {
    if (!ref.current) return

    const { scrollTop, scrollHeight } = ref.current

    scrollPosition.current = scrollTop

    const trigger = 1
    if (scrollHeight - (scrollTop + window.innerHeight) < window.innerHeight * trigger) {
      setIsLoadNeed(true)
    }
  }

  useEffect(() => {
    if (!ref.current) return

    ref.current.addEventListener('scroll', handleScroll)
    return () => {
      if (!ref.current) return
      ref.current.removeEventListener('scroll', handleScroll)
    }
  }, [ref.current])

  ref.current?.scrollTo({ top: scrollPosition.current })

  return (
    <>
      {albumId ? <Outlet /> :
        <>
          <div class="justify-between items-start inline-flex">
            <div className="text-start text-white text-3xl font-bold">Albums</div>
            <SortByIcon />
          </div>
          <SearchBar query={query} setQuery={changeQuery} />
          <div ref={ref} class="flex max-h-[100%] flex-col sm:flex-row sm:flex-wrap gap-x-3 gap-y-3 overflow-y-scroll">
            {albums.map((album) => <AlbumCard album={album} />)}
          </div>
        </>
      }
    </>
  )
}

export default AlbumsPage;