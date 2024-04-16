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
        uploadFiles: async (files) => {
            inProcessTracks.value = [...inProcessTracks.value, ...files.map(f => f.name)]

            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);

                try {
                    await pieApiClient.uploadMp3(formData).then(response => {
                        uploadedTracks.value = [...uploadedTracks.value, { fileName: file.name, response }]
                    })
                } catch (err) {
                    const errResponse = { fileName: file.name, response: { data: {}, meta: { status: 400, xTotalCount: 0 } } } as UploadDetails
                    uploadedTracks.value = [...uploadedTracks.value, errResponse]
                } finally {
                    inProcessTracks.value = inProcessTracks.value.filter(t => t !== file.name)
                }
            }
        }



    }

    return <TrackUploader {...props} />
}
