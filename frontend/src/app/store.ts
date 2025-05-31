import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import {usersReducer} from "../features/users/usersSlice.ts";
import {cocktailsReducer} from "../features/cocktails/cocktailsSlice.ts";
import {cocktailsAdminReducer} from "../features/admin/cocktails/cocktailsAdminSlice.ts";

const usersPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user', 'accessToken'],
};

const rootReducer = combineReducers({
    users: persistReducer(usersPersistConfig, usersReducer),
    cocktails: cocktailsReducer,
    cocktailsAdmin: cocktailsAdminReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;