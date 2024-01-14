import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import makeRequest from "~/lib/axios/baseApi";
import { User } from "./types";


export const sendNumber = createAsyncThunk(
    'user/sendNumber',
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            const response = await makeRequest('POST', '/auth/sendNumber')
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)
