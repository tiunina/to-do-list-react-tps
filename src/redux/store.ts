import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./taskSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist";
import { TaskState } from "../types";

const persistConfig: PersistConfig<TaskState> = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["filter"],
};

const persistedReducer = persistReducer<TaskState>(persistConfig, taskReducer);
export const store = configureStore({
  reducer: {
    tasks: persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export default store;

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
