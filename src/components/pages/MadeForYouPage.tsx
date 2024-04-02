import { searchAlbumsFetch, useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";


import { useRef, useState } from "preact/hooks";
import PlaylistCard from "../common/PlaylistCard";

const MadeForYouPage = () => {
  const [query, setQury] = useState<string>('')

  // const scrollPosition = useRef<number>(0)

  const changeQuery = (q: string) => {
    dispatch(searchAlbumsFetch(q))
    setQury(q)
  }

  const madeForYou = useAppSelector(state => state.library.playlists.madeForYou)

  // const [isLoadNeed, setIsLoadNeed] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()


  // useEffect(() => {
  //   if (isLoadNeed) {
  //     dispatch(loadNextPageAlbums())
  //     setTimeout(() => {
  //       setIsLoadNeed(false)
  //     }, 200)

  //   }
  // }, [isLoadNeed])


  // const handleScroll = () => {
  //   if (!ref.current) return

  //   const { scrollTop, scrollHeight } = ref.current

  //   scrollPosition.current = scrollTop

  //   const trigger = 1
  //   if (scrollHeight - (scrollTop + window.innerHeight) < window.innerHeight * trigger) {
  //     setIsLoadNeed(true)
  //   }
  // }

  // useEffect(() => {
  //   if (!ref.current) return

  //   ref.current.addEventListener('scroll', handleScroll)
  //   return () => {
  //     if (!ref.current) return
  //     ref.current.removeEventListener('scroll', handleScroll)
  //   }
  // }, [ref.current])

  // ref.current?.scrollTo({ top: scrollPosition.current })

  return (
    <>
      <div class="justify-between items-start inline-flex">
        <div className="text-start text-white text-3xl font-bold">Albums</div>
        <SortByIcon />
      </div>
      <SearchBar query={query} setQuery={changeQuery} />
      <div ref={ref} class="flex max-h-[100%] flex-col sm:flex-row sm:flex-wrap gap-x-3 gap-y-3 overflow-y-scroll">
        {madeForYou.map((playlist) => <PlaylistCard playlist={playlist} />)}
      </div>
    </>
  )
}

export default MadeForYouPage;