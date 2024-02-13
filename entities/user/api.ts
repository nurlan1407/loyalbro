import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import makeRequest from "~/lib/axios/baseApi";
import { User } from "./types";
import * as SecureStore from 'expo-secure-store';


export const sendNumber = createAsyncThunk(
    'user/sendNumber',
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            const response = await makeRequest('POST', '/auth/sendNumber', { phoneNumber: phoneNumber })
            console.log(response);
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)



interface VerifyOtpArgs {
    requestId: number;
    OTPCode: string;
}
interface VerifyOtpResponse {
    user: User,
    accessToken: string,
    msg: string
}
export const verifyOtp = createAsyncThunk<VerifyOtpResponse, VerifyOtpArgs>(
    'user/verify',
    async ({ requestId, OTPCode }: VerifyOtpArgs, { rejectWithValue }) => {
        try {
            const response = await makeRequest('POST', '/auth/verify', { requestId: requestId, OTPCode: OTPCode })
            console.log(response.status);
            console.log(response.data);
            
            
            if (response.data) {
                return response.data as VerifyOtpResponse
            }
            throw new Error('No data received');
        } catch (e: any) {
            return rejectWithValue(e.msg)
        }
    }
)



interface EditUserInfoArgs {
    firstName: string,
    lastName: string,
    birthday: number
}
interface EditUserInfoResponse {
    user:User,
    msg: string
}

export const editUserInfo = createAsyncThunk<EditUserInfoResponse, EditUserInfoArgs>(
    'user/finish',
    async ({ firstName, lastName, birthday }: EditUserInfoArgs, { rejectWithValue }) => {
        try {
            const accessToken = await SecureStore.getItemAsync('access_token')
            const response = await makeRequest('POST', '/auth/finish', { firstName: firstName, lastName: lastName, birthday: birthday }, { headers: { 'Authorization': `Bearer ${accessToken}` } })
            if (response.data) {
                return response.data as EditUserInfoResponse
            }
            throw new Error('No data received')
        } catch (e: any) {
            return rejectWithValue(e.msg)
        }
    }
)

