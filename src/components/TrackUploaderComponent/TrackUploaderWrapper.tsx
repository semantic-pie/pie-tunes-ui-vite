import { FunctionalComponent } from "preact"
import { TrackUploader, TrackUploaderProps } from "./TrackUploader"
import { PieApiResponse, pieApiClient } from "@/api/client"
import { Track } from "@/api"
import { useSignal } from "@preact/signals"


type UploadDetails = {
    response: PieApiResponse<{ uploadedTrack: Track }>
    fileName: string
}

export const TrackUploaderWrapper: FunctionalComponent<{}> = ({ }) => {
    const uploadedTracks = useSignal<UploadDetails[]>([])
    const inProcessTracks = useSignal<string[]>([])

    
    const props: TrackUploaderProps = {
        uploadedTracksDetails: uploadedTracks.value,
        inProcessTracks: inProcessTracks.value,
        uploadFiles: (files) => {
            inProcessTracks.value = [...inProcessTracks.value, ...files.map(f => f.name)]

            files.forEach(async file => {
                const formData = new FormData();
                formData.append("file", file);

                await pieApiClient.uploadMp3(formData).then(response => {
                    uploadedTracks.value = [...uploadedTracks.value, {fileName: file.name, response }]
                    inProcessTracks.value = inProcessTracks.value.filter(t => t !== file.name)
                })
            })
        }
            


    }

    return <TrackUploader {...props} />
}
