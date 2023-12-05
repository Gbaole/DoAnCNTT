export const GET_EDITING_PRODUCT = "GET_EDITING_PRODUCT";
const SET_EDITING_PRODUCT = "SET_EDITING_PRODUCT";
const SET_PRODUCT_PROPS = "SET_PRODUCT_PROPS";

export const getEditingProduct = (id: String) => ({
  type: GET_EDITING_PRODUCT,
  payload: id,
});

export const setEditingProduct = (product: {
  _id: String;
  name: String;
  price: String;
  description: String;
  category: String;
  thumbnail: [];
  productType: [];
  ecomURL: [];
}) => ({
  type: SET_EDITING_PRODUCT,
  payload: product,
});

export const setProductProps = (propsName: string, value: any) => ({
  type: SET_PRODUCT_PROPS,
  payload: {
    [propsName]: value,
  },
});

const initProduct = {
  name: "",
  price: "",
  description: "",
  category: "",
  thumbnail: [],
  productType: [],
  ecomURL: [],
};

export default (
  state = initProduct,
  action: { type: String; payload: any }
) => {
  switch (action.type) {
    case SET_EDITING_PRODUCT:
      return { ...state, ...action.payload };
    case SET_PRODUCT_PROPS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
