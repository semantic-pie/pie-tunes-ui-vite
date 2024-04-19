import { useAppDispatch, useAppSelector } from "@/redux/store"
import { api } from "@/api"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import ThreeDots from "../icons/ThreeDots"
import { useRef } from "preact/hooks"
import { trancate } from "@/utils/hellpers"
import { useNavigate } from "@tanstack/react-router"
import { useSwipeHook } from "@/utils/useSwipeHook"
import { useSignal } from "@preact/signals"
import { playNextQueueTrack, playPrevQueueTrack, playTrack } from "@/redux/slices/playerSlice"
import { TrackTimeProgresBar } from "../common/TrackTimeProgresBar"
import { TracksSwitchingControls } from "../BubblePlayerComponent/BubblePlayer/TracksSwitchingControls"
import { LikeWrapper } from "../LikeComponent/LikeWrapper"

type PlayerInfoPage = {
    label: string
    content: any
}

const MobilePlayer = () => {
    const currentTrack = useAppSelector(state => state.player.queue.currentTrack)

    if (!currentTrack) return <div>No Track</div>

    const tracks = useAppSelector(state => state.player.queue.tracks)

    const dispatch = useAppDispatch()

    // const time = useAudioTime()
    // const { duration, seek } = useGlobalAudioPlayer()
    // const position = calcPositionInPercent(time, duration);

    const pages: PlayerInfoPage[] = [
        {
            label: 'Up Next', content: <>
                {tracks.map(track => (<div onClick={() => dispatch(playTrack({ track }))} class='p-[7px] flex gap-3 rounded-lg bg-black bg-opacity-15 cursor-pointer'>
                    <img class='rounded-md w-[54px] h-[54px]' src={api.urlForTrackCoverById({ id: track.musicAlbum.uuid })} alt="" />
                    <div class='flex flex-col truncate'>
                        <span class='text-white text-nowrap '>{trancate(track.title, 32)}</span>
                        <span class='text-white text-nowrap opacity-45'>{trancate(track.musicBand.name, 32)}</span>
                    </div>
                </div>))}
            </>
        },
        {
            label: 'Lyrics', content: <>
                <div class='flex flex-col gap-5 text-gray-300 px-5'>
                    {lyrics.map(l => <p>{l}</p>)}
                </div>
            </>

        },
        {
            label: 'Info', content:
                <pre class='h-full opacity-70 text-[12px] font-mono overflow-scroll'>
                    {JSON.stringify(currentTrack, null, 4)}
                </pre>
        },
    ]

    const currentMiniPage = useSignal<PlayerInfoPage | undefined>(undefined)

    const toggleCurrent = (page: PlayerInfoPage) => {
        if (currentMiniPage.value?.label === page.label) currentMiniPage.value = undefined
        else currentMiniPage.value = page
    }

    const imgRef = useRef<HTMLImageElement>(null)
    const nav = useNavigate({ from: '/player' })

    useSwipeHook(() => nav({ to: '/library/songs' }), 'swiped-down', imgRef)

    const { playing, togglePlayPause } = useGlobalAudioPlayer()

    return (
        <div class='w-full h-dvh flex flex-col justify-start p-2 gap-2 z-10'>
            <div class={`flex ${currentMiniPage.value ? 'flex-row' : 'flex-col'}  justify-between gap-2 `}>
                <img ref={imgRef} class={`rounded-xl max-[380px]:self-center max-[380px]:h-56 max-[380px]:w-56 h-full w-full ${currentMiniPage.value ? '!w-20 !h-20' : ''} transition-all duration-400`} src={api.urlForTrackCoverById({ id: currentTrack.musicAlbum.uuid })} alt="" />

                <div class='w-full flex justify-between mb-[5px] px-3 py-2 bg-black bg-opacity-15 rounded-xl truncate'>
                    <div className="flex flex-col justify-center items-start gap-1 truncate">
                        <div className="text-center text-white text-[24px] font-semibold text-opacity-80 font-['Helvetica Neue'] text-nowrap track-title">{currentTrack.title.length > 25 ? currentTrack.title.substring(0, 25) + '...' : currentTrack.title}</div>
                        <div className="text-center text-white text-opacity-40 text-base font-normal font-['Helvetica Neue']">{currentTrack.musicBand.name.length > 25 ? currentTrack.musicBand.name.substring(0, 25) + '...' : currentTrack.musicBand.name}</div>
                    </div>

                    <div class="flex flex-row gap-5 items-center justify-center mr-2">
                        <LikeWrapper track={currentTrack} />
                        <ThreeDots class="w-4 h-4" />
                    </div>
                </div>
            </div>

            <div class={`flex flex-col mt-auto justify-start ${currentMiniPage.value ? 'gap-[10px]' : ''} rounded-lg bg-black bg-opacity-15 p-[10px] `}>
                <div style={{ height: currentMiniPage.value ? window.innerHeight - 300 : 0 }} class={`flex flex-col overflow-y-scroll pr-[3px] mr-[-5px] gap-3 transition-all duration-200 ease-in`} >
                    {currentMiniPage.value?.content}
                </div>

                <div class='flex justify-between'>
                    {pages.map(p => (<button onClick={() => toggleCurrent(p)} class={`w-[5.6rem] h-[1.8rem] rounded-lg text-white text-opacity-50 bg-black bg-opacity-15 border-opacity-50 ${p.label === currentMiniPage.value?.label ? 'border-white border-[1px] bg-opacity-20 text-opacity-80' : ''}`}>{p.label}</button>))}
                </div>
            </div>

            <div class='flex flex-col max-h-full w-full flex-grow bg-black bg-opacity-10 backdrop-blur-[60px] rounded-xl pt-[30px] px-5 gap-5 transition-all duration-200 ease-out'>
                {/* <ProgresBar classes="w-full rounded-full" classesInner="rounded-full" value={position} setValue={seek} relativeValue={duration} polzunok /> */}
                <TrackTimeProgresBar classes="rounded-md" classesInner="rounded-md" />
                <TracksSwitchingControls isPlaying={playing} onPlayNextClick={() => dispatch(playNextQueueTrack())} onPlayPrevClick={() => playPrevQueueTrack()} togglePlayPause={togglePlayPause} classes='w-[300px] mx-auto' />
            </div>
        </div>
    )
}

const lyrics = `
I've got a river running right into you
I've got a blood trail, red in the blue
Something you say or something you do
A taste of the divine

You've got my body, flesh and bone, yeah
The sky above, the Earth below
Raise me up again
Take me past the edge

I want to see the other side
See the other side
You've got my body, flesh and bone
The sky above, the Earth below

Raise me up again
Take me past the edge
I want to see the other side
Won't you show me what it's like?
Won't you show me what it's like?

Oh, and my love
Did I mistake you for a sign from God?
Or are you really here to cut me off?
Or maybe just to turn me on
'Cause these days

I would be lying if I told you that
I didn't wish that I could be your man
Or maybe make a good girl bad
I've got a river running right into you

I've got a blood trail, red in the blue
Something you say or something you do

The taste of the divine
You've got my body, flesh and bone
The sky above, the Earth below
Nothing to say and nowhere to go
A taste of the divine
    `.split('\n\n')

export default MobilePlayer