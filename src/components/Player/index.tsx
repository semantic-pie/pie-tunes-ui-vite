import { playTrack, useAppDispatch, useAppSelector } from "@/redux/store"
import { api } from "@/api"
import ProgresBar from "../common/ProgressBar"
import { useAudioTime } from "../BubblePlayer/hooks.ts/useAudioTime"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import ThreeDots from "../icons/ThreeDots"
import TracksSwitchingControls from "../BubblePlayer/TracksSwitchingControls"
import ValumeControls from "../BubblePlayer/ValumeControls"
import { useState } from "preact/hooks"
import Like from "../common/Like"

const calcPositionInPercent = (time?: number, duration?: number) => {
    if (time && duration) return (time / duration) * 100
    else return 0
}


const Player = () => {


    const track = useAppSelector(state => state.currentTrack)

    const tracks = useAppSelector(state => state.queue)

    const dispatch = useAppDispatch()

    const time = useAudioTime()
    const { duration, seek } = useGlobalAudioPlayer()
    const position = calcPositionInPercent(time, duration);

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

    const pages: PlayerInfoPage[] = [
        {
            label: 'Up Next', content: <>
                {/* {tracks.length > 1 && [...tracks].sort((o1,o2) => o1.title.localeCompare(o2.title)).map(t => (<div onClick={() => dispatch(playTrack(t))} class='p-[7px] flex gap-3 playerview-info cursor-pointer'> */}
                {tracks.map(t => (<div onClick={() => dispatch(playTrack(t))} class='p-[7px] flex gap-3 playerview-info cursor-pointer'>
                    <img class='rounded-md w-[54px] h-[54px]' src={api.urlForTrackCoverById({id: t.musicAlbum.uuid})} alt="" />
                    <div class='flex flex-col'>
                        <span class='text-white'>{t.title.substring(0, 15)}</span>
                        <span class='text-white opacity-45'>{t.musicBand.name.substring(0, 15)}</span>
                    </div>
                </div>))}
            </>
        },
        {
            label: 'Lyrics', content: <>
                <div class='flex flex-col gap-5 opacity-70 px-5'>
                    {lyrics.map(l => <p>{l}</p>)}
                    </div>     
                </>

        },
        {
            label: 'Info', content: <>
                <p class='opacity-70'>
Sleep Token are a British rock band from London, formed in 2016. The group are an anonymous, masked collective led by a frontman using the moniker Vessel. They have been categorised under many different genres, including alternative metal, post-rock/metal, progressive metal and indie rock/pop. After self-releasing their debut extended play (EP) One in 2016, the band signed with Basick Records and issued a follow-up, Two, the next year. The group later signed with Spinefarm Records and released their debut full-length album Sundowning in 2019, which was followed in 2021 by This Place Will Become Your Tomb. A third album, Take Me Back to Eden, was released in May 2023.
                </p>
            </>
        },
    ]

    return (
        <div class='flex flex-col m-auto w-[900px] justify-between playerview'>
            {track &&
                <div class='w-full flex justify-between p-[50px]'>
                    <div class='w-[330px] h-[450px] flex flex-col justify-between'>
                        <img class='rounded-md' src={api.urlForTrackCoverById({id: track.musicAlbum.uuid})} alt="" />

                        <div className={`h-[74px] justify-center bg-black bg-opacity-10 rounded-xl items-center flex flex-col overflow-hidden relative`}>
                            <div class='w-full flex justify-between pb-[5px] px-3'>
                                <div className="justify-start items-center gap-3.5  flex">

                                    <div className="flex-col justify-center items-start gap-1 inline-flex">
                                        <div className="text-center text-white text-lg font-normal font-['Helvetica Neue'] text-nowrap track-title">{track.title.length > 18 ? track.title.substring(0, 18) + '...' : track.title}</div>
                                        <div className="text-center text-white text-opacity-40 text-base font-normal font-['Helvetica Neue']">{track.musicBand.name}</div>
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
                    <PlayerInfoContainer pages={pages} />
                </div>
            }
            <div class='flex flex-col w-full h-[130px] playerview-buttom pt-[30px] px-[55px] gap-[14px] '>
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
    pages: PlayerInfoPage[]
}

const PlayerInfoContainer = (props: PlayerInfoContainerProps) => {
    const [current, setCurrent] = useState(props.pages[0] ?? undefined)

    return (
        <div class='w-[370px] h-[450px] flex flex-col gap-[10px] justify-start playerview-info p-[10px]'>
            <div class='flex justify-between'>
                {props.pages.map(p => (<button onClick={() => setCurrent(p)} class={`playerview-info-nav-item ${p.label === current.label ? 'playerview-info-nav-item-active' : ''}`}>{p.label}</button>))}
                {/* <button class='playerview-info-nav-item'>Up Next</button>
                <button class='playerview-info-nav-item'>Lyrics</button>
                <button class='playerview-info-nav-item'>Info</button> */}
            </div>


            <div class='flex flex-col overflow-y-scroll gap-3' >
                {current.content}
            </div>
        </div>
    )
}

export default Player