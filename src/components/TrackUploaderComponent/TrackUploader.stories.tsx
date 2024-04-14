import { api } from "@/api";
import { TrackUploader, TrackUploaderProps } from "./TrackUploader";
import { doNothing, repeat, testTrack } from "../common/temp";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default {
    component: TrackUploader,
    title: 'Track Uploader',
    tags: ['autodocs'],
    decorators: [(story: any) => <div class='p-5 bg-black bg-opacity-15 border-black rounded-md'>
        <div style={{
            zIndex: -99,
            backgroundImage: `url('${api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid })}')`,
            filter: 'blur(200px)'
        }}
            class='absolute inset-0 bg-cover bg-center z-0'></div>
        {story()}
    </div>, (story: any) => <Provider store={store}>{story()}</Provider>],
};


export const Default = {
    args: {
        uploadFiles: doNothing,
        inProcessTracks: [],
        uploadedTracksDetails: [],
    } as TrackUploaderProps,
};

// uploadedTracksDetails: [{ fileName: 'test.mp3', response: { meta: { status: 201, xTotalCount: 1 }, data: { uploadedTrack: testTrack } } }]

export const ProcessTracks = {
    args: {
        ...Default.args,
        inProcessTracks: ["Enter_Sandman.mp3", "The_Pretender.mp3"],
    },
};

export const FailedTracks = {
    args: {
        ...Default.args,
        inProcessTracks: ["The_Pretender.mp3"],
        uploadedTracksDetails: [{ fileName: 'Enter_Sandman.mp3', response: { meta: { status: 409, xTotalCount: 1 }, data: { uploadedTrack: undefined } } }]
    },
};

export const WithUploadedTracks = {
    args: {
        ...Default.args,
        uploadedTracksDetails: repeat({ fileName: 'test.mp3', response: { meta: { status: 201, xTotalCount: 1 }, data: { uploadedTrack: testTrack } } }, 10)
    },
};