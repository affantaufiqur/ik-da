import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialHamburgerState = {
    isOpen: false
}

const hamburgerSlice = createSlice({
    name: "hamburger-menu",
    initialState: initialHamburgerState,
    reducers: {
    click(state) {
      state.isOpen = !(state.isOpen);
    },
}
})

const initialAuthState = {
    isAuthenticated : false
}

const authSlice = createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    }
})

const store = configureStore({
    reducer: {
        hamburger: hamburgerSlice.reducer,
        auth: authSlice.reducer
    }
})

export const hamburgerAction = hamburgerSlice.actions
export const authAction = authSlice.actions;

export default store