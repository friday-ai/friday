import { combineReducers, configureStore, getDefaultMiddleware, Store } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appReducer from '../../components/App/app.reducer';

const { DEV } = import.meta.env;

const rootReducer = combineReducers({
  app: appReducer,
});

const store: Store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
  devTools: DEV,
});

export default store;

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch();
export const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector;
