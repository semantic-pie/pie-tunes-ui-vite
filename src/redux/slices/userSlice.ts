import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ApiUser, pieApiClient } from "@/api/client"
import { AppDispatch, RootState } from "../store"
import { MusicAlbum, MusicBand, Track } from "@/api"

interface UserSlice {
    user?: ApiUser
}

const initialState: UserSlice = {
    user: undefined
}

export type FetchLikeProps = { track?: Track, album?: MusicAlbum, band?: MusicBand }

export const fetchForLike = createAsyncThunk<FetchLikeProps, FetchLikeProps, { state: RootState, dispatch: AppDispatch }>(
    'user/fetchForLike',
    async (props) => {
        let entityUuid;
        if (props.track) entityUuid = props.track.uuid
        if (props.album) entityUuid = props.album.uuid
        if (props.band) entityUuid = props.band.uuid

        return pieApiClient.postEvent({ type: 'LIKE_ENTITY', entityUuid: entityUuid! }).then(() => props)
    }
)

export const fetchForUnlike = createAsyncThunk<FetchLikeProps, FetchLikeProps, { state: RootState }>(
    'user/fetchForUnlike',
    async (props) => {
        let entityUuid;
        if (props.track) entityUuid = props.track.uuid
        if (props.album) entityUuid = props.album.uuid
        if (props.band) entityUuid = props.band.uuid

        return pieApiClient.postEvent({ type: 'REMOVE_LIKE', entityUuid: entityUuid! }).then(() => props)
    }
)

export const fetchForUser = createAsyncThunk(
    'user/fetchForUnlike',
    async () =>  pieApiClient.getUser().then(response => response.data)
    
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: ApiUser }>) => {
            state.user = action.payload.user
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchForUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})

export const { setUser } = userSlice.actions
