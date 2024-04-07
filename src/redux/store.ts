import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { playerSlice } from "./slices/playerSlice"
import { dataSlice } from "./slices/dataSlice"
import { userSlice } from "./slices/userSlice"
import { searchSlice } from "./slices/searchSlice"

// types configuration
export const store = configureStore({
    reducer: {
        player: playerSlice.reducer,
        library: dataSlice.reducer,
        user: userSlice.reducer,
        search: searchSlice.reducer
    },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector