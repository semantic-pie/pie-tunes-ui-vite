import { playTrack, useAppDispatch, useAppSelector } from "@/redux/store"
import { Track, api } from "@/api"
import ProgresBar from "../common/ProgressBar"
import { useAudioTime } from "../BubblePlayer/hooks.ts/useAudioTime"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import ThreeDots from "../icons/ThreeDots"
import TracksSwitchingControls from "../BubblePlayer/TracksSwitchingControls"
import ValumeControls from "../BubblePlayer/ValumeControls"
import { useEffect, useState } from "preact/hooks"
import Like from "../common/Like"

const calcPositionInPercent = (time?: number, duration?: number) => {
    if (time && duration) return (time / duration) * 100
    else return 0
}


const Player = () => {
    const track = useAppSelector(state => state.currentTrack)

    const tracks = useAppSelector(state => state.library.songs)

    const time = useAudioTime()
    const { duration, seek } = useGlobalAudioPlayer()
    const position = calcPositionInPercent(time, duration);

    const info = `Sleep Token are a British rock band from London, formed in 2016. The group are an anonymous, masked collective led by a frontman using the moniker Vessel. They have been categorised under many different genres, including alternative metal, post-rock/metal, progressive metal and indie rock/pop. After self-releasing their debut extended play (EP) One in 2016, the band signed with Basick Records and issued a follow-up, Two, the next year. The group later signed with Spinefarm Records and released their debut full-length album Sundowning in 2019, which was followed in 2021 by This Place Will Become Your Tomb. A third album, Take Me Back to Eden, was released in May 2023.`
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

console.log('render')

    return (
        <div class='flex flex-col m-auto w-[900px] justify-between playerview rounded-[45px] bg-white bg-opacity-15 z-10 overflow-y-scroll'>
            {track &&
                <div class='w-full flex flex-row justify-between p-12'>
                    <div class='w-[330px] h-[450px] flex flex-col justify-between gap-2'>
                        <img class='rounded-md' src={api.urlForTrackCoverById({ id: track.album.uuid })} alt="" />

                        <div className={`h-[74px] justify-center bg-black bg-opacity-10 rounded-xl items-center flex flex-col overflow-hidden relative`}>
                            <div class='w-full flex justify-between pb-[5px] px-3'>
                                <div className="flex justify-start items-center gap-3.5">

                                    <div className="flex-col justify-center items-start gap-1 inline-flex">
                                        <div className="text-center text-white text-lg font-normal font-['Helvetica Neue'] text-nowrap track-title">{track.title.length > 18 ? track.title.substring(0, 18) + '...' : track.title}</div>
                                        <div className="text-center text-white text-opacity-40 text-base font-normal font-['Helvetica Neue']">{track.band.name}</div>
                                    </div>
                                </div>
                                <div class="flex flex-row gap-5 items-center justify-center">
                                    <div class="w-4 h-4">
                                        <ThreeDots class="w-4 h-4" />
                                    </div>
                                    <div>
                                        <Like entity={track} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PlayerInfoContainer queue={tracks} lyrics={lyrics} info={info} />

                </div>
            }
            <div class='flex flex-col w-full h-[130px] playerview-buttom bg-black bg-opacity-10 backdrop-blur-[60px] rounded-t-0 rounded-b-[45px] pt-[30px] px-5 sm:px-[55px] gap-[14px]'>
                <ProgresBar classes="w-full rounded-full" classesInner="rounded-full" value={position} setValue={seek} relativeValue={duration} polzunok />
                <div class='relative'>
                    <div class='flex mx-auto w-[210px]'>
                        <TracksSwitchingControls />
                        <div class='absolute right-5 self-center'>
                            <ValumeControls />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

type PlayerInfoPage = {
    label: string
    content: any
}

type PlayerInfoContainerProps = {
    // pages: PlayerInfoPage[]
    queue: Track[]
    lyrics: string
    info: string
}

const PlayerInfoContainer = (props: PlayerInfoContainerProps) => {
    const [current, setCurrent] = useState('Up Next')
    const dispatch = useAppDispatch()

    return (
        <div class={`sm:w-[370px] h-[450px] flex flex-col justify-start gap-[10px] rounded-lg bg-black bg-opacity-15 p-[10px] mt-2 sm:mt-0 mb-[138px] sm:mb-0`}>
            <div class='flex justify-between'>
                {['Up Next', 'Lyrics', 'Info'].map(p => (<button onClick={() => setCurrent(p)} class={`w-[5.6rem] h-[1.8rem] rounded-lg text-white text-opacity-50 bg-black bg-opacity-15 border-opacity-50 ${p === current ? 'border-white border-[1px] text-opacity-100' : ''}`}>{p}</button>))}
            </div>

            <div class='flex flex-col overflow-y-scroll pr-[3px] mr-[-5px] gap-3' >
                {
                    current === 'Up Next' && <>
                        {props.queue.map(t => (<div onClick={() => dispatch(playTrack(t))} class='p-[7px] flex gap-3 rounded-lg bg-black bg-opacity-15 cursor-pointer'>
                            <img class='rounded-md w-[54px] h-[54px]' src={api.urlForTrackCoverById({ id: t.album.uuid })} alt="" />
                            <div class='flex flex-col'>
                                <span class='text-white text-nowrap'>{t?.title.substring(0, 30)}</span>
                                <span class='text-white text-nowrap opacity-45'>{t?.band.name.substring(0, 30)}</span>
                            </div>
                        </div>))}
                    </>
                }
                {
                    current === 'Lyrics' && <>
                        <div class='flex flex-col gap-5 text-gray-300 px-5'>
                            {props.lyrics.split('\n\n').map(l => <p>{l}</p>)}
                        </div>
                    </>

                }
                {
                    current === 'Info' && <>
                        <p class='opacity-70'>
                            {props.info}
                        </p>
                    </>
                }
            </div>

        </div>
    )
}

export default Player