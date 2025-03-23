import { configureStore } from "@reduxjs/toolkit";
import {
  globalreducer,
  indexreducer,
  headerindex,
  accountreducer,
} from "../StateSlice/State.slice.ts";

const store = configureStore({
  reducer: {
    globalState: globalreducer,
    indexState: indexreducer,
    headerIndexState: headerindex,
    accountLogin: accountreducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

// Типізація dispatch
export type AppDispatch = typeof store.dispatch;
export default store;
