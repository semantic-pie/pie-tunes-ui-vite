import { Track, api } from "@/api"
import { playTrack, useAppDispatch } from "@/redux/store"
import { useSignal } from "@preact/signals"

type PlayerInfoContainerProps = {
    queue: Track[]
    lyrics: string
    info: string
}

type MiniPageName = 'Up Next' | 'Lyrics' | 'Info'


const PlayerInfoContainer = (props: PlayerInfoContainerProps) => {
    const currentMiniPage = useSignal<MiniPageName>('Up Next')
    const changeMiniPage = (page: MiniPageName) => currentMiniPage.value = page

    const dispatch = useAppDispatch()

    return (
        <div class={`sm:w-[370px] h-[450px] flex flex-col justify-start gap-[10px] rounded-lg bg-black bg-opacity-15 p-[10px] mt-2 sm:mt-0 mb-[138px] sm:mb-0`}>
            <div class='flex justify-between'>
                <button onClick={() => changeMiniPage("Up Next")} class={`w-[5.6rem] h-[1.8rem] rounded-lg text-white text-opacity-50 bg-black bg-opacity-15 border-opacity-50 ${currentMiniPage.value === 'Up Next' ? 'border-white border-[1px] text-opacity-100' : ''}`}>Up Next</button>
                <button onClick={() => changeMiniPage("Lyrics")} class={`w-[5.6rem] h-[1.8rem] rounded-lg text-white text-opacity-50 bg-black bg-opacity-15 border-opacity-50 ${currentMiniPage.value === 'Lyrics' ? 'border-white border-[1px] text-opacity-100' : ''}`}>Lyrics</button>
                <button onClick={() => changeMiniPage("Info")} class={`w-[5.6rem] h-[1.8rem] rounded-lg text-white text-opacity-50 bg-black bg-opacity-15 border-opacity-50 ${currentMiniPage.value === 'Info' ? 'border-white border-[1px] text-opacity-100' : ''}`}>Info</button>
            </div>

            <div class='flex flex-col overflow-y-scroll pr-[3px] mr-[-5px] gap-3' >
                {
                    currentMiniPage.value === 'Up Next' && <>
                        {props.queue.map(t => (<div onClick={() => dispatch(playTrack(t))} class='p-[7px] flex gap-3 rounded-lg bg-black bg-opacity-15 cursor-pointer'>
                            <img class='rounded-md w-[54px] h-[54px]' src={api.urlForTrackCoverById({ id: t.album.uuid })} alt="" />
                            <div class='flex flex-col truncate'>
                                <span class='text-white text-nowrap'>{t?.title.substring(0, 30)}</span>
                                <span class='text-white text-nowrap opacity-45'>{t?.band.name.substring(0, 30)}</span>
                            </div>
                        </div>))}
                    </>
                }
                {
                    currentMiniPage.value === 'Lyrics' && <>
                        <div class='flex flex-col gap-5 text-gray-300 px-5'>
                            {props.lyrics.split('\n\n').map(l => <p>{l}</p>)}
                        </div>
                    </>

                }
                {
                    currentMiniPage.value === 'Info' && <>
                        <p class='opacity-70'>
                            {props.info}
                        </p>
                    </>
                }
            </div>

        </div>
    )
}

export default PlayerInfoContainer