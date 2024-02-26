import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialHamburgerState = {
  isOpen: false,
};

const hamburgerSlice = createSlice({
  name: "hamburger-menu",
  initialState: initialHamburgerState,
  reducers: {
    click(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

const initialGenreState = {
  selectedGenre: "",
};

const genreSlice = createSlice({
  name: "genre",
  initialState: initialGenreState,
  reducers: {
    setGenre: (state, action) => {
      state.selectedGenre = state.selectedGenre === action.payload ? null : action.payload;
    },
  },
});

const initialAuthState = {
  isAuthenticated: false,
};

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
  },
});

const initialSearchState = {
  searchKey: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    clearSearchText: (state) => {
      state.searchText = null;
    },
  },
});

const store = configureStore({
  reducer: {
    hamburger: hamburgerSlice.reducer,
    genre: genreSlice.reducer,
    auth: authSlice.reducer,
    search: searchSlice.reducer,
  },
});

export const hamburgerAction = hamburgerSlice.actions;
export const genreAction = genreSlice.actions;
export const authAction = authSlice.actions;
export const searchActions = searchSlice.actions;

export default store;
