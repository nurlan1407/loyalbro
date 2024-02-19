import { createSlice } from "@reduxjs/toolkit";
import asset1 from 'public/asset1.png'
import asset2 from 'public/asset2.jpeg'
import { PayloadAction } from "@reduxjs/toolkit";
import { Establishment } from "./types";
import { getEstablishments } from "./api";

interface EstablishmentState {
    establishments: Establishment[] ;
    isLoading: boolean;
    currentEst:Establishment|null;
}
const initialState: EstablishmentState = {
    establishments: [], 
    isLoading: false, 
    currentEst:null
}


const establishmentSlice = createSlice({
    name: "establishment",
    initialState: initialState,
    reducers: {
        setEstablishments:(state,action)=>{
            state.establishments = action.payload
        },
        setCurrentEstablishment:(state,action)=>{
            state.currentEst = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getEstablishments.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(getEstablishments.fulfilled, (state, action) => {
            state.isLoading = false
            state.establishments = action.payload
        })
        builder.addCase(getEstablishments.pending, (state, action) => {
            state.isLoading = true
        })
    },
})


export const { setEstablishments,setCurrentEstablishment } = establishmentSlice.actions

export default establishmentSlice.reducer