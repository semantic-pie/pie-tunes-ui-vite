
import { madeForYouViewRoute } from "@/router/library";
import TrackCard from "../common/TrackCard";
import ThreeDots from "../icons/ThreeDots";
import Like from "../common/Like";
import { Playlist } from "@/api";

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

  return (
    <>
      <div class={`flex flex-col gap-5 overflow-y-scroll sm:overflow-hidden`}>
        <div class='p-1 sm:p-5 gap-5 flex flex-col sm:flex-row justify-between'>
          <img class='w-full sm:w-[200px] sm:h-[200px] rounded-md' src={'/src/assets/dailymixpic.jpeg'} alt="" />
          <div class='flex flex-col w-full  justify-between'>
            <h3 class="hidden sm:block text-[18px]">Playlist</h3>
            <div class={`flex flex-col p-2.5 albumview-info justify-between h-fit gap-4 leading-tight`}>
              <h2 class={`text-[24px] sm:text-[42px]`}>{playlist.name}</h2>
              <div class='flex justify-between'>
                {calcGenres(playlist)}
                <div class='flex justify-between items-center w-[80px] mx-5'>
                  <ThreeDots class={'w-[27px] h-[27px]'} />
                  <Like entity={{ liked: false, uuid: '' }} />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="sm:p-5 flex flex-col sm:overflow-y-scroll">
          {playlist.tracks.map((wrapper, i) => <TrackCard class={`p-2.5 ${i !== 0 ? 'border-t-[0.75px] border-white border-opacity-50' : ''} `} track={wrapper.track} />)}
        </div>
      </div>
    </>
  )
}

export default PlaylistPage;