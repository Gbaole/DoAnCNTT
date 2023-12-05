import { call, put } from "redux-saga/effects";
import { setLoading, showToast } from "../../Ducks/notyfyDux";
import { getSingleProduct } from "../../../API/Product";
import { setEditingProduct } from "../../Ducks/adminDux";

export function* handleGetEditingProduct(action: {
  type: String;
  payload: String;
}) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(getSingleProduct, action.payload);
    yield put(setEditingProduct(data.product));
  } catch (error) {
    yield put(
      showToast({
        title: "Load sản phẩm thất bại!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}
