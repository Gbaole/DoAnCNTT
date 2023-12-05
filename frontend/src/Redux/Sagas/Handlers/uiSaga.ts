import { getAllCategoryWeb } from "../../../API/Category";
import { call, put } from "redux-saga/effects";
import { setLoading } from "../../Ducks/notyfyDux";
import { setCategory, setPages } from "../../Ducks/uiDux";
import { getAllPageWeb } from "../../../API/Pages";

export function* handleGetCategory() {
  yield put(setLoading(true));
  try {
    const { data } = yield call(getAllCategoryWeb);
    yield put(setCategory(data));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* handleGetPages() {
  yield put(setLoading(true));
  try {
    const { data } = yield call(getAllPageWeb);
    yield put(setPages(data));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(setLoading(false));
  }
}