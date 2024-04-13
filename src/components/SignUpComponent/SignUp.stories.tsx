import { api } from "@/api";
import { doNothing, testTrack } from "../common/temp";
import { SignUp, SignUpProps } from "./SignUp";



export default {
    component: SignUp,
    title: 'SignUp',
    tags: ['autodocs'],
    decorators: [(story: any) => <div class=''>
        <div style={{
            zIndex: -99,
            backgroundImage: `url('${api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid })}')`,
            filter: 'blur(200px)'
        }}
            class='absolute inset-0 bg-cover bg-center z-0'></div>
        {story()}
    </div>],
};


export const Default = {
    args: {
        onSubmit: doNothing
    } as SignUpProps,
};
