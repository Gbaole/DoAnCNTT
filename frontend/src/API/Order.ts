import axios from "axios";
import { ALL_ORDER_URL, NEW_ORDER_URL, ORDER_DETAIL_URL } from "../API/KalaURL";

function newOrder(orderForm: {
  customerName: String;
  customerEmail: String;
  customerPhone: String;
  customerHomeSt: String;
  customerCity: String;
  customerDistricrt: String;
  customerWard: String;
  cart: {
    products: [
      {
        id: String;
        typeID: Number;
        name: String;
        price: Number;
        quantity: Number;
      }
    ];
    count: Number;
    totalPrice: Number;
  };
}) {
  return axios.post(NEW_ORDER_URL, orderForm);
}

function getAllOrder(skip = 0, limit = 4) {
  return axios.get(ALL_ORDER_URL, { params: { skip, limit } });
}

function getOrderDetail(mdh: String) {
  return axios.get(ORDER_DETAIL_URL(mdh));
}

export { newOrder, getAllOrder, getOrderDetail };
