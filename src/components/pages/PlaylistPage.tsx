
import { madeForYouViewRoute } from "@/router/library";
import ThreeDots from "../icons/ThreeDots";
import Like from "../common/Like";
import { Playlist, api } from "@/api";
import { ScrollAndLoadList } from "../ScrollAndLoadListComponent/ScrollAndLoadList";
import { TrackCardWrapper } from "../TrackCardComponent/TrackCardWrapper";
import { useAppDispatch } from "@/redux/store";
import { fetchForLike } from "@/redux/slices/userSlice";

const calcGenres = (playlist: Playlist) => {
  const map = new Map()

  playlist.tracks.forEach(wrapper =>
    wrapper.track.genres.forEach(
      genre => map.set(genre.name, (map.get(genre.name) || 0) + 1))
  )

  const [first, second, third] = [...map.entries()].sort((a, b) => b[1] - a[1]).map(s => s[0]).slice(0, 3);

  return <div class='flex items-center gap-1.5 opacity-80'><span class='text-nowrap capitalize'>{first},</span><span class='text-nowrap capitalize'>{second}</span>and<span class='text-nowrap capitalize'>{third}</span></div>
}

const PlaylistPage = () => {
  const playlist = madeForYouViewRoute.useLoaderData()
  const dispatch = useAppDispatch()

  return (
    <>
      <div class={`flex h-full flex-col gap-3 overflow-y-scroll pr-[8px] mr-[-14px] sm:overflow-hidden`}>
        <div class='h-28 sm:h-auto sm:p-5 gap-3 flex flex-row justify-between'>
          <img class='h-28 w-28 sm:w-[200px] sm:h-[200px] rounded-md' src={api.urlForTrackCoverById({ id: 'dailyplaylist.jpeg' })} alt="" />
          <div class='mt-auto sm:mt-0 flex flex-col w-full  justify-between'>
            <h3 class="hidden sm:block text-[18px]">Playlist</h3>
            <div class={`flex flex-col p-2.5 albumview-info justify-between h-fit gap-4 leading-tight`}>
              <h2 class={`text-[24px] sm:text-[42px]`}>{playlist.name}</h2>
              <div class='hidden sm:flex justify-between'>
                {calcGenres(playlist)}
                <div class='flex justify-between items-center w-[80px] mx-5'>
                  <ThreeDots class={'w-[27px] h-[27px]'} />
                  <Like onLikeClick={() => dispatch(fetchForLike({  }))} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='sm:hidden flex justify-between albumview-info p-3'>
          {calcGenres(playlist)}
          <div class='flex justify-between items-center w-[80px]'>
            <ThreeDots class={'w-[27px] h-[27px]'} />
            <Like onLikeClick={() => dispatch(fetchForLike({  }))} />
          </div>
        </div>


        <ScrollAndLoadList>
          {playlist.tracks.map((wrapper, i) => <TrackCardWrapper track={wrapper.track} contextQueue={playlist.tracks.map(t => t.track)} />)}
        </ScrollAndLoadList>
      </div>
    </>
  )
}

export default PlaylistPage;