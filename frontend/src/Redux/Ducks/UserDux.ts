export const SET_USER = "SET_USER";
export const LOG_OUT = "LOG_OUT";
export const GET_USER = "GET_USER";
export const LOG_IN = "LOG_IN";
export const RESET_USER = "RESET_USER";

export const getUser = () => ({
  type: GET_USER,
});

export const setUser = ({ user, token }) => ({
  type: SET_USER,
  user,
  token,
});

export const login = ({ username, password }) => ({
  type: LOG_IN,
  username,
  password,
});

export const resetUser = () => ({
  type: RESET_USER,
});

export const logout = () => ({
  type: LOG_OUT,
});

const initState = {
  user: { name: "", username: "", dateOfBirth: "", email: "", role: "" },
  token: null,
};

export const userReducer = (state = initState, action) => {
  if (action.type === SET_USER) {
    return { ...state, user: action.user, token: action.token };
  } else if (action.type === LOG_OUT) {
    return { ...state, ...initState };
  } else if (action.type == RESET_USER) {
    return initState;
  } else {
    return state;
  }
};
