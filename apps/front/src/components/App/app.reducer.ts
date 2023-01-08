import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import updateThemeColor from '../../services/theme/themeColor';

interface AppState {
  drawerToggled: boolean;
  currentView: string;
  theme: string;
  themeColors: { primary: string; secondary: string };
  setLoading: boolean;
  serverOffline: boolean;
}

// Declare Global state here to not import store
// and avoid dependency cycles
export type GlobalState = {
  app: AppState;
};

const initialState: AppState = {
  drawerToggled: false,
  currentView: 'Dashboard',
  theme: 'light',
  themeColors: { primary: 'rgb(20,37,91)', secondary: 'rgb(37,9,179)' },
  setLoading: false,
  serverOffline: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawerToggled = !state.drawerToggled;
    },
    changeView: (state, action: PayloadAction<string>) => {
      state.currentView = action.payload;
    },
    changeTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      state.themeColors = updateThemeColor();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.setLoading = action.payload;
    },
    setServerOffline: (state, action: PayloadAction<boolean>) => {
      state.serverOffline = action.payload;
    },
  },
});

export default appSlice.reducer;

// Actions
export const { toggleDrawer, changeView, changeTheme } = appSlice.actions;

// Selectors
export const drawerToggled = (state: GlobalState): boolean => state.app.drawerToggled;
export const currentView = (state: GlobalState): string => state.app.currentView;
export const theme = (state: GlobalState): string => state.app.theme;
export const themeColors = (state: GlobalState) => state.app.themeColors;
export const loading = (state: GlobalState): boolean => state.app.setLoading;
export const serverOffline = (state: GlobalState): boolean => state.app.serverOffline;
