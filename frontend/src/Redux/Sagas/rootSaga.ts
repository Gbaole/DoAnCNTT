import { take, takeLatest } from "redux-saga/effects";
import { GET_USER, LOG_IN, LOG_OUT } from "../Ducks/UserDux";
import {
  handleGetUserInfo,
  handleLogin,
  handleLogout,
} from "./Handlers/AuthenticationHandler";
import { GET_CATEGORY, GET_PAGES } from "../Ducks/uiDux";
import { handleGetCategory, handleGetPages } from "./Handlers/uiSaga";
import { GET_EDITING_PRODUCT } from "../Ducks/adminDux";
import { handleGetEditingProduct } from "./Handlers/AdminEditProductSaga";

export function* watcherSaga() {
  yield takeLatest(LOG_OUT, handleLogout);
  yield takeLatest(GET_USER, handleGetUserInfo);
  yield takeLatest(LOG_IN, handleLogin);
  yield takeLatest(GET_CATEGORY, handleGetCategory);
  yield takeLatest(GET_PAGES, handleGetPages);
  yield takeLatest(GET_EDITING_PRODUCT, handleGetEditingProduct);
}
