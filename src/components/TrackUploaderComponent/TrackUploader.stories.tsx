import { TrackUploader, TrackUploaderProps } from "./TrackUploader";
import { WrappWithBlurAndRedux } from "../stories/test-wrappers";
import { doNothing, repeat, testTrack } from "../stories/test-entities";

export default {
    component: TrackUploader,
    title: 'Track Uploader',
    tags: ['autodocs'],
    decorators: [(story: any) => <div class='p-5 bg-black bg-opacity-15 border-black rounded-md'>
        <WrappWithBlurAndRedux> {story()}</WrappWithBlurAndRedux>
    </div>],
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