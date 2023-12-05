const SET_LOADING = "SET_LOADING";
const SHOW_TOAST = "SHOW_TOAST";

export const setLoading = (visible: Boolean) => ({
  type: SET_LOADING,
  visible,
});

export const showToast = (toast: {
  title: String;
  status: String;
  description?: String;
  duration?: Number;
  isClosable?: Boolean;
}) => ({ type: SHOW_TOAST, toast });

const initState = {
  visible: false,
  toast: null,
};

export default (
  state = initState,
  action: { type: String; visible: Boolean; toast: any }
) => {
  if (action.type === SET_LOADING) {
    return { ...state, visible: action.visible };
  } else if (action.type === SHOW_TOAST) {
    return { ...state, toast: action.toast };
  } else {
    return state;
  }
};
