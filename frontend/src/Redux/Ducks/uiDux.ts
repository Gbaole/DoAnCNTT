export const GET_CATEGORY = "GET_CATEGORY";
export const SET_CATEGORY = "SET_CATEGORY";
export const GET_PAGES = "GET_PAGES";
export const SET_PAGES = "SET_PAGES";

export const getCategory = () => ({
  type: GET_CATEGORY,
});

export const setCategory = (cat: []) => ({
  type: SET_CATEGORY,
  payload: cat,
});

export const getPages = () => ({
  type: GET_PAGES,
});

export const setPages = (pages: []) => ({
  type: SET_PAGES,
  payload: pages,
});

const initialState = {
  category: [],
  pages: [],
};

export default (
  state = initialState,
  action: { type: String; payload: any }
) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    case SET_PAGES:
      return { ...state, pages: action.payload };
    default:
      return state;
  }
};