import { Track, api } from "@/api"
import { FunctionalComponent } from "preact"
import ThreeDots from "@/components/icons/ThreeDots"
import Like from "@/components/common/Like"
import PlayerInfoContainer from "./PlayerInfoContainer"
import { TrackTimeProgresBar } from "@/components/common/TrackTimeProgresBar"
import { TracksSwitchingControls } from "@/components/BubblePlayerComponent/BubblePlayer/TracksSwitchingControls"
import { VolumeControls } from "@/components/BubblePlayerComponent/BubblePlayer/VolumeControls"

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
    return (
        <div class='flex flex-col m-auto w-[900px] justify-between playerview rounded-[45px] bg-white bg-opacity-15 z-10'>
            <div class='w-full flex flex-row justify-between p-12'>
                <div class='w-[330px] h-[450px] flex flex-col justify-between gap-2'>
                    <img class='rounded-md' src={trackCoverUrl} alt="" />

                    <div className={`h-[74px] justify-center bg-black bg-opacity-10 rounded-xl items-center flex flex-col overflow-hidden relative`}>
                        <div class='w-full flex justify-between pb-[5px] px-3'>
                            <div className="flex justify-start items-center gap-3.5 truncate">

                                <div className="flex-col justify-center items-start gap-1 inline-flex">
                                    <div className="text-center text-white text-lg font-normal font-['Helvetica Neue'] text-nowrap track-title">{currentTrack.title}</div>
                                    <div className="text-center text-white text-opacity-40 text-base font-normal font-['Helvetica Neue']">{currentTrack.musicBand.name}</div>
                                </div>
                            </div>
                            <div class="flex flex-row gap-5 items-center justify-center">
                                <div class="w-4 h-4">
                                    <ThreeDots class="w-4 h-4" />
                                </div>
                                <div>
                                    <Like onLikeClick={onTrackLike} />
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