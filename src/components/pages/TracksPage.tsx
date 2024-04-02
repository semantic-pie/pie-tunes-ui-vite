import { loadNextPage, searchTracksFetch, useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import { useEffect, useRef, useState } from "preact/hooks";
import TrackCard from "../common/TrackCard";


type TracksPageProps = {
}

const TracksPage = (props: TracksPageProps) => {
  const [query, setQury] = useState<string>('')

  const ref = useRef<HTMLDivElement>(null)
  // const [albums, setAlbums] = useState<MusicAlbum[]>([])

  const changeQuery = (q: string) => {
    dispatch(searchTracksFetch(q))
    setQury(q)
  }

  const songs = useAppSelector(state => state.library.songs)
  const searched = useAppSelector(state => state.library.searchSongs)

  const tracks = query.length > 0 ? searched : songs

  const dispatch = useAppDispatch()

  const [isLoadNeed, setIsLoadNeed] = useState(false)

  useEffect(() => {
    if (isLoadNeed) {
      dispatch(loadNextPage())
      setTimeout(() => {
        setIsLoadNeed(false)
      }, 200)

    }
  }, [isLoadNeed])


  const handleScroll = () => {
    if (!ref.current) return

    const { scrollTop, scrollHeight } = ref.current
    // play around with the trigger factor instead of fixed px
    const trigger = 1
    if (scrollHeight - (scrollTop + window.innerHeight) < window.innerHeight * trigger) {
      setIsLoadNeed(true)
    }
  }

  useEffect(() => {
    if (!ref.current) return
    // const app = document.querySelector('#app')
    // if (!app) return

    ref.current.addEventListener('scroll', handleScroll)
    return () => {
      if (ref.current)
        ref.current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Songs</div>
        <SortByIcon />
      </div>
      <SearchBar query={query} setQuery={changeQuery} />
      <div ref={ref} class={`flex flex-col max-h-[100%] flex-1  gap-4 overflow-y-scroll`}>
        {tracks.map((track) => <TrackCard track={track} />)}
        {tracks.length === 0 && <span class='m-auto opacity-50'>You haven't added anything yet</span>}
      </div>
    </>
  )
}

export default TracksPage;