import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    EntityId,
} from "@reduxjs/toolkit";
import { User } from './types';


interface State {
    user: User,
    status: string,
    error: string | null
}

const defaultUser: User = {
    phoneNumber: '',
    firstName: '',
    lastName: '',
    birthday: new Date(), // or a specific default date
    // accessToken: ''
}

const initialState: State = {
    user: defaultUser,
    status: "loaded",
    error: null,
};

const UserSlice = createSlice({
    name: "facts",
    initialState,
    reducers: {
        setPhoneNumber: (state, value) => {
            state.user.phoneNumber = value.payload
        }
    },
});

export const { setPhoneNumber } = UserSlice.actions;

export default UserSlice.reducer;