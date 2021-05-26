import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        logins: (state, action) => {
            state.user = action.payload; // setUser(action.payload)
        },
        logout: (state) => {
            state.user = null; // setUser(action.payload)
        },
    },
});

export const { logins, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
