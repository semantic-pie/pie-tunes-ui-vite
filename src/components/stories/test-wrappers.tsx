import { api } from "@/api";
import { store } from "@/redux/store";
import { FunctionComponent } from "preact";
import { Provider } from "react-redux";
import { testTrack } from "./test-entities";


export const WrappWithBlur: FunctionComponent = ({ children }) => {
    return (
        <>
            <div style={{
                zIndex: -99,
                backgroundImage: `url('${api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid })}')`,
                filter: 'blur(200px)'
            }}
                class='absolute inset-0 bg-cover bg-center z-0'></div>
           {children}
        </>
    )
}

export const WrappWithBlurAndRedux: FunctionComponent = ({ children }) => {
    return (
        <Provider store={store}>
            <WrappWithBlur>
                {children}
            </WrappWithBlur>
        </Provider>
    )
}