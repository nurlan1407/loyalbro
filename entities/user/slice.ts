import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    EntityId,
} from "@reduxjs/toolkit";
import { User } from './types';
import { sendNumber,verifyOtp ,editUserInfo} from "./api";
import * as SecureStore from 'expo-secure-store';

interface State {
    user: User,
    isLoading: boolean,
    error: string | null,
    requestId:number | null
}

const defaultUser: User = {
    phoneNumber: '',
    firstName: '',
    lastName: '',
    birthday: 0, 
}

const initialState: State = {
    user: defaultUser,
    error: null,
    isLoading: false,
    requestId: null
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setPhoneNumber: (state, value) => {
            state.user.phoneNumber = value.payload
        },
        dismissError:(state)=>{
            state.error = null
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(sendNumber.pending, (state,action)=>{
            state.isLoading = true
        })
        builder.addCase(sendNumber.fulfilled, (state,action)=>{
            state.isLoading = false
            state.requestId = action.payload.requestId
        })
        builder.addCase(sendNumber.rejected, (state,action)=>{
            state.isLoading = false,
            //@ts-ignore
            state.error = action.payload
        })


        builder.addCase(verifyOtp.pending, (state,action)=>{
            state.isLoading = true
        })
        builder.addCase(verifyOtp.fulfilled, (state,action)=>{
            state.isLoading = false
            state.user = action.payload.user
            //setAccessToken
            SecureStore.setItemAsync('access_token', action.payload.accessToken)
        })
        builder.addCase(verifyOtp.rejected, (state,action)=>{
            state.isLoading = false,
            //@ts-ignore
            state.error = action.payload
        })


        builder.addCase(editUserInfo.pending, (state,action)=>{
            state.isLoading = true
        })
        builder.addCase(editUserInfo.fulfilled, (state,action)=>{
            state.isLoading = false
            state.user = action.payload.user
        })
        builder.addCase(editUserInfo.rejected, (state,action)=>{
            state.isLoading = false,
            //@ts-ignore
            state.error = action.payload
        })
    }
});

export const { setPhoneNumber,dismissError } = UserSlice.actions;

export default UserSlice.reducer;