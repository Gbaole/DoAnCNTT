import { call, put } from "redux-saga/effects";
import {
  requestLogin,
  requestLogout,
  requsetUserProfile,
} from "../../../API/authentication";
import { setLoading, showToast } from "../../Ducks/notyfyDux";
import { redirect } from "react-router-dom";
import { resetUser, setUser } from "../../Ducks/UserDux";
import { persistor } from "../../store";

export function* handleLogout() {
  yield put(setLoading(true));
  try {
    const res = yield call(requestLogout);
    yield put(setLoading(false));
    redirect("/");
    yield put(
      showToast({
        title: "Đăng xuất thành công!",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    );
  } catch (error) {
    yield put(setLoading(false));
    yield put(
      showToast({
        title: "Đăng xuất thất bại!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    );
  }
}

export function* handleGetUserInfo() {
  const location = window.location.pathname.split("/")[1];
  if (location === "administrator" || location == "login") {
    console.log(location);

    try {
      yield put(setLoading(true));
      const res = yield call(requsetUserProfile);
      if (res.status === 200) {
        yield put(setUser({ user: res.data.user, token: "kogla" }));
        yield put(
          showToast({
            title: "Đăng nhập thành công!",
            status: "success",
            duration: 4000,
            isClosable: true,
          })
        );
      }
    } catch (error) {
      persistor.flush();
      yield put(
        showToast({
          title: "Phiên đăng nhập đã hết hạn!",
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
}

export function* handleLogin(action) {
  yield put(setLoading(true));

  try {
    const { username, password } = action;
    const res = yield call(requestLogin, username, password);
    if (res.status == 200) {
      yield put(setLoading(false));
      yield put(setUser(res.data));
      localStorage.setItem("KalaLoginData", JSON.stringify(res.data));
    }
  } catch (error) {
    console.log(error);
    yield put(setLoading(false));

    yield put(
      showToast({
        title: "Đăng nhập thất bại!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    );
  }
}
