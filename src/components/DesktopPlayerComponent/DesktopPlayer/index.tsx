import { Track } from "@/api"
import { FunctionalComponent } from "preact"
import ThreeDots from "@/components/icons/ThreeDots"
import PlayerInfoContainer from "./PlayerInfoContainer"
import { TrackTimeProgresBar } from "@/components/common/TrackTimeProgresBar"
import { TracksSwitchingControls } from "@/components/BubblePlayerComponent/BubblePlayer/TracksSwitchingControls"
import { VolumeControls } from "@/components/BubblePlayerComponent/BubblePlayer/VolumeControls"
import { LikeWrapper } from "@/components/LikeComponent/LikeWrapper"
import { useSignal } from "@preact/signals"
import PieTunesTestLogo from "@/components/icons/PieTunesTestLogo"

export type DesktopPlayerProps = {
    currentTrack: Track
    trackCoverUrl: string
    queue: Track[]
    isPlaying?: boolean
    onTrackLike: () => void

    onNextTrackClick: () => void
    onPrevTrackClick: () => void
    onTogglePlayPause: () => void

    volume: number
    setVolume: (volume: number) => void
}



export const DesktopPlayer: FunctionalComponent<DesktopPlayerProps> = ({ currentTrack, trackCoverUrl, queue, isPlaying, onTrackLike, onNextTrackClick, onPrevTrackClick, onTogglePlayPause, volume, setVolume }) => {
    const error = useSignal<boolean>(false)
    return (
        <div class='flex flex-col m-auto justify-between playerview rounded-[45px] bg-white bg-opacity-15 z-10'>
            <div class='w-full flex flex-row justify-between gap-12 p-12'>
                <div class='w-[330px] h-[450px] flex flex-col justify-between gap-2'>

                    {
                        error.value ? <div class='bg-black bg-opacity-10 rounded-xl'><PieTunesTestLogo class={'fill-white opacity-10'} /></div> : <img onError={() => error.value = true} class='rounded-md aspect-square bg-black bg-opacity-10' src={trackCoverUrl} alt="" />
                    }

                    <div className={`h-[74px] justify-center bg-black bg-opacity-10 rounded-xl items-center flex flex-col overflow-hidden relative`}>
                        <div class='w-full flex items-center gap-3 px-3 justify-between overflow-hidden'>
                            <div className="w-4/5 flex flex-col items-start gap-0.5 truncate">
                                <div class="w-full text-white text-lg font-normal track-title truncate">{currentTrack.title}</div>
                                <div class="text-white text-opacity-40 text-base font-normal truncate">{currentTrack.musicBand.name}</div>
                            </div>
                            <div class=" flex flex-row gap-5 items-center justify-center">
                                <LikeWrapper track={currentTrack} />
                                <div class="w-4 h-4">
                                    <ThreeDots class="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PlayerInfoContainer currentTrack={currentTrack} queue={queue} lyrics={lyrics} info={JSON.stringify(currentTrack, null, 4)} />

            </div>
            <div class='flex flex-col w-full h-[130px] playerview-buttom bg-black bg-opacity-10 backdrop-blur-[60px] rounded-t-0 rounded-b-[45px] pt-[30px] px-5 sm:px-[55px] gap-[14px]'>
                <TrackTimeProgresBar classes="rounded-[29px]" classesInner="rounded-[29px]" polzunok />
                <div class='relative'>
                    <div class='flex mx-auto w-[210px]'>
                        <TracksSwitchingControls isPlaying={isPlaying} onPlayNextClick={onNextTrackClick} onPlayPrevClick={onPrevTrackClick} togglePlayPause={onTogglePlayPause} />
                        <div class='absolute right-5 self-center'>
                            <VolumeControls volume={volume} setVolume={setVolume} />
                        </div>
                    </div>
                </div>
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
`