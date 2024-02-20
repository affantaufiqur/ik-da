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

const initialGenreState = {
    selectedGenres: []
}

const genreSlice = createSlice({
    name: "genre",
    initialState: initialGenreState,
    reducers: {
        addGenre: (state, action) => {
            state.selectedGenres.push(action.payload)
        },
        removeGenre: (state, action) => {
            state.selectedGenres = state.selectedGenres.filter(genre => genre !== action.payload)
        }
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
        genre: genreSlice.reducer,
        auth: authSlice.reducer
    }
})

export const hamburgerAction = hamburgerSlice.actions
export const genreAction = genreSlice.actions
export const authAction = authSlice.actions;

export default store