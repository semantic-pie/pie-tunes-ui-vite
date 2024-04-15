import { Track } from "@/api";
import { PieApiResponse, pieApiClient } from "@/api/client";
import { ScrollAndLoadList } from "@/components/ScrollAndLoadListComponent/ScrollAndLoadList";
import { TrackCardWrapper } from "@/components/TrackCardComponent/TrackCardWrapper";
import { useSignal } from "@preact/signals";
import { FunctionalComponent } from "preact";
import { FailedCard } from "./FailedCard";
import { ProcessCard } from "./ProcessCard";

export type TrackUploaderProps = {
    uploadedTracksDetails: UploadDetails[]
    inProcessTracks: string[]
    uploadFiles: (files: File[]) => void
}

export type UploadDetails = {
    response: PieApiResponse<{ uploadedTrack: Track }>
    fileName: string
}

export const TrackUploader: FunctionalComponent<TrackUploaderProps> = ({ uploadedTracksDetails, uploadFiles, inProcessTracks }) => {
    const dragAndDropMode = useSignal<boolean>(false)

    const onFileDrag = (e: DragEvent) => {
        const dt = e.dataTransfer

        if (dt && dt.types && dt.types.indexOf('Files') != -1) {
            if (!dragAndDropMode.value)
                dragAndDropMode.value = true
        }

        e.stopPropagation()
        e.preventDefault()
    }

    const onFileDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!e.dataTransfer) return

        const files = [...e.dataTransfer?.files]

        uploadFiles(files)

        dragAndDropMode.value = false
    }

    const onFileInput = (e: InputEvent) => {
        uploadFiles([...(e.target as any).files])
    }

    const tracks = uploadedTracksDetails.map(d => d.response.data.uploadedTrack)

    return (
        <div class='h-full w-full flex flex-col'>
            <h2 className="flex text-white text-3xl font-bold mb-5">Uploader</h2>

            <div onDragLeave={() => dragAndDropMode.value = false} onDragOver={onFileDrag} onDrop={onFileDrop} class={`hidden sm:flex h-full ${uploadedTracksDetails.length > 0 ? '' : ''} mb-5 flex-1 flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg bg-transparent transition-all duration-200 ease-in`}>
                <div class=" flex flex-col items-center my-auto justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 opacity-70" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p class="text-sm  opacity-70"><span class="font-semibold">Drag and drop to upload</span></p>
                    <input id="file-selector" onInput={onFileInput} type="file" class="hidden" multiple />
                    <label for="file-selector" class='my-2 w-fit text-sm  opacity-70 cursor-pointer transition-opacity underline ease-in' >Or choose from directory</label>
                    <p class="text-xs  opacity-70">Mp3 only (MAX. 50mb)</p>
                </div>
            </div> 

            <div class={`${(uploadedTracksDetails.length > 0) || (inProcessTracks.length > 0) ? 'h-full sm:h-[510px]' : 'h-0'} mb-5 transition-all duration-200 ease-in`}>
                <ScrollAndLoadList>
                    {uploadedTracksDetails.map(details => details.response.meta.status === 201 ? <TrackCardWrapper classes="bg-black bg-opacity-10" track={details.response.data.uploadedTrack} contextQueue={tracks} /> : <FailedCard name={details.fileName} errorCode={details.response.meta.status} />)}
                    {inProcessTracks.map(fileName => <ProcessCard name={fileName} />)}
                </ScrollAndLoadList>
            </div>

            <div class='w-full mt-auto p-2 flex justify-center sm:hidden bg-black bg-opacity-20 rounded-lg'>
                <input id="file-selector" onInput={onFileInput} type="file" class="hidden" multiple />
                <label for="file-selector" class='my-2 w-fit text-sm  opacity-70 cursor-pointer transition-opacity underline ease-in' >Upload Your Mp3</label>
            </div>
        </div>
    )
}