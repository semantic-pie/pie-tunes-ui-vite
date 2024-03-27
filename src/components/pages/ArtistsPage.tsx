import { loadNextPageArtists, useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import { useEffect, useRef, useState } from "preact/hooks";
import ArtistCard from "../common/ArtistCard";

const ArtistsPage = () => {
    const [query, setQury] = useState<string>('')

    const artists = useAppSelector(state => query.length > 0 ? state.library.artists.filter(a => a.name.includes(query)) : state.library.artists)

    const [isLoadNeed, setIsLoadNeed] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()


    useEffect(() => {
        if (isLoadNeed) {
          dispatch(loadNextPageArtists())
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
            if (!ref.current) return
            ref.current.removeEventListener('scroll', handleScroll)
        }
      }, [])

    return (
        <div style={{maxHeight: window.innerHeight - 290}} class={`flex flex-col gap-3`}>
            {/* {albumId ? <Outlet /> : */}
                <>
                    <div class="justify-between items-start inline-flex">
                        <div className="text-start text-white text-3xl font-bold">Artists</div>
                        <SortByIcon />
                    </div>
                    <SearchBar query={query} setQuery={setQury} />
                    <div ref={ref} class="flex max-h-[100%] flex-col sm:flex-row sm:flex-wrap gap-x-3 gap-y-3 overflow-y-scroll">
                        {artists.map((a) => <ArtistCard band={a} />)}
                    </div>
                </>
            {/* } */}
        </div>
    )
}

export default ArtistsPage;