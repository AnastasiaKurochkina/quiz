import { createSlice } from "@reduxjs/toolkit";
interface IUser {
    id: string | undefined
    name: string | undefined
    login: string | undefined
    password: string | undefined
    fullname: string | undefined
}
export interface State {
    user: IUser
}
const initialState: State = {
    user: {
        id: undefined,
        name: undefined,
        login: undefined,
        password: undefined,
        fullname: undefined
    }
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.user.id = action.payload.id;
            state.user.name = action.payload.name;
            state.user.login = action.payload.login;
            state.user.password = action.payload.password;
            state.user.fullname = action.payload.fullname;
        },
        logout(state) {
            state.user.id = undefined;
            state.user.name = undefined;
            state.user.login = undefined;
            state.user.password = undefined;
            state.user.fullname = undefined;
        }
    }
});
export const {login,logout} = userSlice.actions;
export default userSlice.reducer;