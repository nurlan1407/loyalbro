import { createAsyncThunk } from '@reduxjs/toolkit'
import makeRequest from '~/lib/axios/baseApi';
import * as SecureStore from 'expo-secure-store';
import { Establishment } from './types';

async function getToken() {
  return await SecureStore.getItemAsync('accessToken');
}


export const getEstablishments = createAsyncThunk<Establishment[]>(
    'est/get',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = await getToken()
            const response = await makeRequest('GET', 'mobile/est/get ', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(response.data);

            return response.data
        } catch (e: any) {
            return rejectWithValue(e.msg)
        }
    }
)