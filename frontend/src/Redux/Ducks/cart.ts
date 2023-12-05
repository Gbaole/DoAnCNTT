export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const SUB_QUANTITY = "SUB_QUANTITY";
export const EMPTY_CART = "EMPTY_CART";
export const LOAD_CART = "LOAD_CART";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};
export const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    product,
  };
};
export const subtractQuantity = (product) => {
  return {
    type: SUB_QUANTITY,
    product,
  };
};
export const addQuantity = (product) => {
  return {
    type: ADD_QUANTITY,
    product,
  };
};

export const emptyCart = () => ({
  type: EMPTY_CART,
});

export const loadCartAction = (cart: Cart) => ({
  type: LOAD_CART,
  cart,
});

export type product = {
  id: string;
  typeID: number;
  quantity: number;
  price: number;
  pos: number;
};

export type Cart = {
  products: product[];
  count: number;
  totalPrice: number;
};

const initialState: Cart = {
  products: [],
  count: 0,
  totalPrice: 0,
};

export default (
  state = initialState,
  action: {
    type: String;
    product: product;
    cart?: Cart;
  }
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const id = linSearch(
        state.products,
        action.product.id,
        action.product.typeID
      );
      const qu: number = action.product.quantity;
      if (id === -1) {
        return {
          ...state,
          products: [
            ...state.products,
            { ...action.product, quantity: qu ? qu : 1 },
          ],
          count: state.count + (qu ? qu : 1),
          totalPrice: state.totalPrice + (qu ? qu : 1) * action.product.price,
        };
      }
      return {
        ...state,
        products: state.products.map((product: { quantity: number }, i) =>
          i == id
            ? { ...product, quantity: product.quantity + (qu ? qu : 1) }
            : product
        ),
        count: state.count + (qu ? qu : 1),
        totalPrice: state.totalPrice + (qu ? qu : 1) * action.product.price,
      };

    case REMOVE_FROM_CART:
      const newProduct: product[] = [];
      for (let i = 0; i < state.products.length; i++) {
        if (i !== action.product.pos) {
          newProduct.push(state.products[i]);
        }
      }
      return {
        ...state,
        products: newProduct,
        count: state.count - state.products[action.product.pos].quantity,
        totalPrice:
          state.totalPrice -
          state.products[action.product.pos].quantity *
            state.products[action.product.pos].price,
      };
    case ADD_QUANTITY:
      return {
        ...state,
        products: state.products.map((product, id) =>
          id === action.product.pos
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
        count: state.count + 1,
        totalPrice: state.totalPrice + action.product.price,
      };
    case SUB_QUANTITY:
      return {
        ...state,
        products: state.products.map((product: { quantity: number }, id) =>
          id === action.product.pos && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
        count:
          state.products[action.product.pos].quantity > 1
            ? state.count - 1
            : state.count,
        totalPrice:
          state.products[action.product.pos].quantity > 1
            ? state.totalPrice - action.product.price
            : state.totalPrice,
      };
    case EMPTY_CART:
      return initialState;
    case LOAD_CART:
      return { ...action.cart };
    default:
      return state;
  }
};

const linSearch = (array: product[], id: string, type: number) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      if (array[i].typeID == type) {
        return i;
      }
    }
  }
  return -1;
};
