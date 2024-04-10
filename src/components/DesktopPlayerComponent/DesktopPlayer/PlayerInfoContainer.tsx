import { Track } from "@/api"
import { TrackCardWrapper } from "@/components/TrackCardComponent/TrackCardWrapper"
import { useSignal } from "@preact/signals"
import { useEffect, useRef } from "preact/hooks"

type PlayerInfoContainerProps = {
    currentTrack: Track
    queue: Track[]
    lyrics: string
    info: string
}

type MiniPageName = 'Up Next' | 'Lyrics' | 'Info'


const PlayerInfoContainer = (props: PlayerInfoContainerProps) => {
    const currentMiniPage = useSignal<MiniPageName>(props.queue.length > 0 ? 'Up Next' : 'Info')
    const ref = useRef<HTMLDivElement>(null)

    const changeMiniPage = (page: MiniPageName) => currentMiniPage.value = page

    useEffect(() => {
        if (ref.current && currentMiniPage.value === 'Up Next') {
            const selectedTrack = ref.current.querySelector('.selected')
            if (selectedTrack) selectedTrack.scrollIntoView()
        }
    }, [props.currentTrack])

    return (
        <div class={`sm:w-[370px] h-[450px] flex flex-col justify-start gap-[10px] rounded-lg bg-black bg-opacity-15 p-[10px] mt-2 sm:mt-0 mb-[138px] sm:mb-0`}>
            <div class='flex justify-between'>
                <button onClick={() => changeMiniPage("Up Next")} class={`w-[5.6rem] h-[1.8rem] rounded-lg text-white text-opacity-50 bg-black bg-opacity-15 border-opacity-50 ${currentMiniPage.value === 'Up Next' ? 'border-white border-[1px] text-opacity-100' : ''}`}>Up Next</button>
                <button onClick={() => changeMiniPage("Lyrics")} class={`w-[5.6rem] h-[1.8rem] rounded-lg text-white text-opacity-50 bg-black bg-opacity-15 border-opacity-50 ${currentMiniPage.value === 'Lyrics' ? 'border-white border-[1px] text-opacity-100' : ''}`}>Lyrics</button>
                <button onClick={() => changeMiniPage("Info")} class={`w-[5.6rem] h-[1.8rem] rounded-lg text-white text-opacity-50 bg-black bg-opacity-15 border-opacity-50 ${currentMiniPage.value === 'Info' ? 'border-white border-[1px] text-opacity-100' : ''}`}>Info</button>
            </div>

            <div ref={ref} class='flex flex-col overflow-y-scroll pr-[3px] mr-[-5px] gap-3' >
                {
                    currentMiniPage.value === 'Up Next' && <>
                        {props.queue.map(track => <TrackCardWrapper track={track} contextQueue={props.queue} selected={props.currentTrack.uuid === track.uuid} />)}
                    </>
                }
                {
                    currentMiniPage.value === 'Lyrics' && <>
                        <div class='opacity-70 flex flex-col gap-5 px-5'>
                            {props.lyrics.split('\n\n').map(l => <p>{l}</p>)}
                        </div>
                    </>

                }
                {
                    currentMiniPage.value === 'Info' && <>
                        <pre class='opacity-70 text-[12px] font-mono overflow-scroll'>
                            {props.info}
                        </pre>
                    </>
                }
            </div>

        </div>
    )
}

export default PlayerInfoContainer