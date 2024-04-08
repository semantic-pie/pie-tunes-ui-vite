import { SnoopySearchTrackExtended, SnoopyTrackStatus } from "@/api/client"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { toMinSec } from "@/utils/hellpers"
import LoadingIcon from "../icons/LoadingIcon"
import CheckIcon from "../icons/CheckIcon"
import CrossIcon from "../icons/CrossIcon"
import UploadIcon from "../icons/UploadIcon"
import { clearSnoopySearch, fetchForSnoopyDownload, fetchForSnoopySearch } from "@/redux/slices/searchSlice"
import { useEffect } from "preact/hooks"



type SnoopySearchProps = {
    query: string
}

const SnoopySearch = (props: SnoopySearchProps) => {
    const dispatch = useAppDispatch()
    const { result } = useAppSelector(state => state.search.snoopy)

    // if (props.query && result.length > 0) dispatch(clearSnoopySearch())

    useEffect(() => {
        dispatch(clearSnoopySearch()) 
    }, [props.query])

    return (
        <>
            {!(result.length > 0) ?
                <button onClick={() => dispatch(fetchForSnoopySearch({ query: props.query }))} class='sm:w-[400px] mx-auto w-fit text-[20px] px-5 py-2 bg-black bg-opacity-15 hover:bg-opacity-20 backdrop-blur-[60px] rounded-[20px]'>Search in other music services</button>
                : <div class='w-full sm:w-[1000px] mx-auto flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 gap-5 py-4 backdrop-blur-[60px]'>
                    <h2 class='text-[28px] font-bold'>Tracks from other sources</h2>

                    <div class={` h-fit flex flex-col gap-4 overflow-y-scroll`}>
                        {result.map(snoop => <SnoopyTrack snoopyTrack={snoop} />)}
                    </div>
                </div>}
        </>
    )
}

type SnoopyTrackProps = {
    snoopyTrack: SnoopySearchTrackExtended
}

const SnoopyTrack = (props: SnoopyTrackProps) => {
    const dispatch = useAppDispatch()

    const status = props.snoopyTrack.status

    const query = `${props.snoopyTrack.bandName} ${props.snoopyTrack.title}`
    const id = props.snoopyTrack.id

    
    return (
        <div class={`flex flex-row justify-start items-center gap-3`}>
            <img class="w-12 h-12 rounded-md cursor-pointer" src={props.snoopyTrack.coverUrl} /> :


            <div class='w-full flex justify-between items-center'>
                <div class='cursor-pointer' >
                    <div class="text-start text-white text-base font-normal capitalize">{props.snoopyTrack.title}</div>
                    <div class="text-stasrt text-white text-opacity-60 text-sm font-normal capitalize">{props.snoopyTrack.bandName}</div>
                </div>

                <div class='flex items-center gap-3'>
                    <div onClick={() => dispatch(fetchForSnoopyDownload({ query, id }))} class={`${props.snoopyTrack.status ? '' : 'cursor-pointer'}`}>
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
