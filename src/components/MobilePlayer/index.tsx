import { playTrack, useAppDispatch, useAppSelector } from "@/redux/store"
import { api } from "@/api"
import ProgresBar from "../common/ProgressBar"
import { useAudioTime } from "../BubblePlayer/hooks.ts/useAudioTime"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import ThreeDots from "../icons/ThreeDots"
import TracksSwitchingControls from "../BubblePlayer/TracksSwitchingControls"
import { useEffect, useRef, useState } from "preact/hooks"
import Like from "../common/Like"
import { trancate } from "@/utils/hellpers"
import { useNavigate } from "@tanstack/react-router"
import { useSwipeHook } from "@/utils/useSwipeHook"
import { useSignal } from "@preact/signals"

const calcPositionInPercent = (time?: number, duration?: number) => {
    if (time && duration) return (time / duration) * 100
    else return 0
}

type PlayerInfoPage = {
    label: string
    content: any
}

const MobilePlayer = () => {
    const track = useAppSelector(state => state.currentTrack)

    if (!track) return <div>No Track</div>

    const tracks = useAppSelector(state => state.queue)

    const dispatch = useAppDispatch()

    const time = useAudioTime()
    const { duration, seek } = useGlobalAudioPlayer()
    const position = calcPositionInPercent(time, duration);

    const pages: PlayerInfoPage[] = [
        {
            label: 'Up Next', content: <>
                {tracks.map(t => (<div onClick={() => dispatch(playTrack(t))} class='p-[7px] flex gap-3 rounded-lg bg-black bg-opacity-15 cursor-pointer'>
                    <img class='rounded-md w-[54px] h-[54px]' src={api.urlForTrackCoverById({ id: t.album.uuid })} alt="" />
                    <div class='flex flex-col '>
                        <span class='text-white text-nowrap'>{trancate(t.title, 32)}</span>
                        <span class='text-white text-nowrap opacity-45'>{trancate(t.band.name, 32)}</span>
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
            label: 'Info', content: <>
                <p class='opacity-70'>
                    Sleep Token are a British rock band from London, formed in 2016. The group are an anonymous, masked collective led by a frontman using the moniker Vessel. They have been categorised under many different genres, including alternative metal, post-rock/metal, progressive metal and indie rock/pop. After self-releasing their debut extended play (EP) One in 2016, the band signed with Basick Records and issued a follow-up, Two, the next year. The group later signed with Spinefarm Records and released their debut full-length album Sundowning in 2019, which was followed in 2021 by This Place Will Become Your Tomb. A third album, Take Me Back to Eden, was released in May 2023.
                </p>
            </>
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

    return (
        <div class='w-full h-dvh flex flex-col justify-start p-2 gap-2 z-10'>
            <div class={`flex ${currentMiniPage.value ? 'flex-row' : 'flex-col'}  justify-between gap-2 `}>
                <img ref={imgRef} class={`rounded-xl h-full w-full ${currentMiniPage.value ? '!w-20 !h-20' : ''} transition-all duration-400`} src={api.urlForTrackCoverById({ id: track.album.uuid })} alt="" />

                <div class='w-full flex justify-between pb-[5px] px-3 py-1 bg-black bg-opacity-15 rounded-xl'>
                    <div className="flex flex-col justify-center items-start gap-1">
                        <div className="text-center text-white text-[24px] font-semibold text-opacity-80 font-['Helvetica Neue'] text-nowrap track-title">{track.title.length > 25 ? track.title.substring(0, 25) + '...' : track.title}</div>
                        <div className="text-center text-white text-opacity-40 text-base font-normal font-['Helvetica Neue']">{track.band.name.length > 25 ? track.band.name.substring(0, 25) + '...' : track.band.name}</div>
                    </div>

                    <div class="flex flex-row gap-5 items-center justify-center">
                        <ThreeDots class="w-4 h-4" />
                        <Like entity={track} />
                    </div>
                </div>
            </div>

            <div class={`flex flex-col mt-auto justify-start gap-[10px] rounded-lg bg-black bg-opacity-15 p-[10px] `}>
                <div style={{ height: currentMiniPage.value ? window.innerHeight - 300 : 0 }} class={`flex flex-col overflow-y-scroll gap-3 transition-all duration-200 ease-in`} >
                    {currentMiniPage.value?.content}
                </div>

                <div class='flex justify-between'>
                    {pages.map(p => (<button onClick={() => toggleCurrent(p)} class={`w-[5.6rem] h-[1.8rem] rounded-lg text-white text-opacity-50 bg-black bg-opacity-15 border-opacity-50 ${p.label === currentMiniPage.value?.label ? 'border-white border-[1px] text-opacity-100' : ''}`}>{p.label}</button>))}
                </div>
            </div>

            <div class='flex flex-col max-h-full w-full flex-grow bg-black bg-opacity-10 backdrop-blur-[60px] rounded-xl pt-[30px] px-5 gap-5 transition-all duration-200 ease-out'>
                <ProgresBar classes="w-full rounded-full" classesInner="rounded-full" value={position} setValue={seek} relativeValue={duration} polzunok />
                <TracksSwitchingControls class='w-[300px] mx-auto' />
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