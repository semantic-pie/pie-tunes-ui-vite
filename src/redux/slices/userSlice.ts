import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { pieApiClient } from "@/api/client"
import { RootState } from "../store"

interface UserSlice {
    userUuid: string
}

const initialState: UserSlice = {
    userUuid: '7ea506b5-0cf4-4f7a-8781-42bf2e5fd591'
}

type FetchLikeProps = { trackUuid: string }

export const fetchForLike = createAsyncThunk<{ trackUuid: string }, FetchLikeProps, { state: RootState }>(
    'user/fetchForLike',
    async ({ trackUuid }, { getState }) => {
        return pieApiClient.postEvent({ type: 'LIKE_TRACK', user_uuid: getState().user.userUuid, track_uuid: trackUuid }).then(() => ({ trackUuid }))
    }
)

export const fetchForUnlike = createAsyncThunk<{ trackUuid: string }, FetchLikeProps, { state: RootState }>(
    'user/fetchForUnlike',
    async ({ trackUuid }, { getState }) => {
        return pieApiClient.postEvent({ type: 'REMOVE_LIKE', user_uuid: getState().user.userUuid, track_uuid: trackUuid }).then(() => ({ trackUuid }))
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
})
