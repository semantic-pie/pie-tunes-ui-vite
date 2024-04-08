import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { pieApiClient } from "@/api/client"
import { AppDispatch, RootState } from "../store"
import { MusicAlbum, MusicBand, Track } from "@/api"

interface UserSlice {
    userUuid: string
}

const initialState: UserSlice = {
    userUuid: '7ea506b5-0cf4-4f7a-8781-42bf2e5fd591'
}

export type FetchLikeProps = { track?: Track, album?: MusicAlbum, band?: MusicBand }

export const fetchForLike = createAsyncThunk<FetchLikeProps, FetchLikeProps, { state: RootState, dispatch: AppDispatch }>(
    'user/fetchForLike',
    async (props, { getState }) => {
        return pieApiClient.postEvent({ type: 'LIKE_TRACK', user_uuid: getState().user.userUuid, track_uuid: props.track?.uuid! }).then(() => props)
    }
)

export const fetchForUnlike = createAsyncThunk<FetchLikeProps, FetchLikeProps, { state: RootState }>(
    'user/fetchForUnlike',
    async (props, { getState }) => {
        return pieApiClient.postEvent({ type: 'REMOVE_LIKE', user_uuid: getState().user.userUuid, track_uuid: props.track?.uuid! }).then(() => props)
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
})
