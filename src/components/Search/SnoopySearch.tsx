import { SnoopySearchTrack, pieApiClient } from "@/api/client"
import { searchAddSnoopyTrack, useAppDispatch } from "@/redux/store"
import { toMinSec } from "@/utils/hellpers"
import LoadingIcon from "../icons/LoadingIcon"
import CheckIcon from "../icons/CheckIcon"
import CrossIcon from "../icons/CrossIcon"
import UploadIcon from "../icons/UploadIcon"
import { useSignal } from "@preact/signals"

type SnoopySearchTrackExtended = SnoopySearchTrack & { status?: SnoopyTrackStatus }

type SnoopySearchProps = {
    query: string
}

enum SnoopyTrackStatus {
    IN_PROCESS,
    SUCCESSFULLY,
    FAILED
}

const SnoopySearch = (props: SnoopySearchProps) => {
    const snoopySearchResult = useSignal<SnoopySearchTrackExtended[] | undefined>(undefined)
    const setSearchResult = (tracks: SnoopySearchTrack[]) => {snoopySearchResult.value = tracks}

    const snoopySearchFetch = () =>
        pieApiClient.searchSnoopy({ q: props.query })
            .then(data => setSearchResult(data.data))

    const changeTrackStatus = (id: string) =>
        (status: SnoopyTrackStatus) => {
            if (snoopySearchResult.value) setSearchResult(snoopySearchResult.value.map(t => t.id === id ? { ...t, status } : t))
        }

    return (
        <>
            {!snoopySearchResult.value ?
                <button onClick={snoopySearchFetch} class='mx-auto w-fit text-[20px] px-5 py-2 bg-black bg-opacity-15 hover:bg-opacity-20 backdrop-blur-[60px] rounded-[20px]'>Search in other music services</button>
                : <div class='w-full flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 gap-5 py-4 backdrop-blur-[60px]'>
                    <h2 class='text-[28px] font-bold'>Tracks from other sources</h2>


                    <div class={`w-full h-fit flex flex-col gap-4 overflow-y-scroll`}>
                        {snoopySearchResult.value.map(snoop => <SnoopyTrack snoopyTrack={snoop} changeStatus={changeTrackStatus(snoop.id)} />)}
                    </div>

                </div>}
        </>
    )
}

type SnoopyTrackProps = {
    snoopyTrack: SnoopySearchTrackExtended
    changeStatus: (status: SnoopyTrackStatus) => void
}

const SnoopyTrack = (props: SnoopyTrackProps) => {
    const dispatch = useAppDispatch()

    const upload = (query: string) => {
        if (!props.snoopyTrack.status) {
            props.changeStatus(SnoopyTrackStatus.IN_PROCESS)
            pieApiClient.uploadSnoopy({ query })
                .then(response => {
                    if (response.meta.status === 200)
                        props.changeStatus(SnoopyTrackStatus.SUCCESSFULLY)
                    else props.changeStatus(SnoopyTrackStatus.FAILED)

                    console.log(response)
                    return response.data
                })

                .then(data => data.uploadedTrack.uuid)
                .then(addedTrackUuid => pieApiClient.findTrackByUuid({ uuid: addedTrackUuid }))
                .then(response => dispatch(searchAddSnoopyTrack(response.data)))
        }

    }

    const status = props.snoopyTrack.status

    return (
        <div class={`w-full flex flex-row justify-start items-center gap-3`}>
            <img class="w-12 h-12 rounded-md cursor-pointer" src={props.snoopyTrack.coverUrl} /> :


            <div class='w-full flex justify-between items-center'>
                <div class='cursor-pointer' >
                    <div class="text-start text-white text-base font-normal capitalize">{props.snoopyTrack.title}</div>
                    <div class="text-stasrt text-white text-opacity-60 text-sm font-normal capitalize">{props.snoopyTrack.bandName}</div>
                </div>

                <div class='flex items-center gap-3'>
                    <div onClick={() => upload(`${props.snoopyTrack.bandName} ${props.snoopyTrack.title}`)} class={`${props.snoopyTrack.status ? '' : 'cursor-pointer'}`}>
                        {
                            status != undefined ? status === SnoopyTrackStatus.IN_PROCESS ? <LoadingIcon /> : status === SnoopyTrackStatus.SUCCESSFULLY ? <CheckIcon class='w-5 h-5' /> : <CrossIcon class='w-5 h-5' /> : <UploadIcon />
                        }

                    </div>

                    <span class='test-white text-[14px] opacity-50'>
                        {toMinSec(props.snoopyTrack.lengthInMilliseconds)}
                    </span>

                </div>

            </div>


        </div>
    )
}

export default SnoopySearch
