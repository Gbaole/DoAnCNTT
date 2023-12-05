import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./Sagas/rootSaga";
import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "./Ducks/notyfyDux";
import { userReducer } from "./Ducks/UserDux";
import cartReducer from "./Ducks/cart";
import uiDux from "./Ducks/uiDux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducer = combineReducers({
  notify: notifyReducer,
  user: userReducer,
  cart: cartReducer,
  ui: uiDux,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    sagaMiddleware,
  ],
});
export const persistor = persistStore(store);

sagaMiddleware.run(watcherSaga);

export default store;
