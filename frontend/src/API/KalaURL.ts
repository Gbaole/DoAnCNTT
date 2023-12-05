const MAIN_URL =
  process.env.NODE_ENV === "dev"
    ? "http://localhost:4000/v1"
    : "https://api.kalacandela.com/v1";

const GET_PROFILE = `${MAIN_URL}/me`;
const LOG_IN = `${MAIN_URL}/login`;
const LOG_OUT = `${MAIN_URL}/logout`;
const SEARCH_PRODUCT = `${MAIN_URL}/search`;
const HOME_PRODUCT = `${MAIN_URL}/products`;
const ALL_PRODUCT = `${MAIN_URL}/products`;
const PRODUCT_DETAIL = (id: String) => `${MAIN_URL}/product/${id}`;
const SINGLE_PRODUCT = (_id: String) => `${MAIN_URL}/product/${_id}`;
const NEW_ORDER_URL = `${MAIN_URL}/order/new`;
const ALL_ORDER_URL = `${MAIN_URL}/admin/orders`;
const ORDER_DETAIL_URL = (mdh: String) => `${MAIN_URL}/order/${mdh}`;
const SCAN_BAR_CODE_URL = (code: String) => `${MAIN_URL}/product/scan/${code}`;
const GET_PRODUCT_BARCODE_URL = (id: String) =>
  `${MAIN_URL}/product/getbarcode/${id}`;
const CREATE_ARTICLE_URL = `${MAIN_URL}/news/createNews`;
const ALL_ARTICLE_ADMIN_URL = `${MAIN_URL}/admin/news/allNews`;
const SINGLE_ARTICLE_URL = (id: String) => `${MAIN_URL}/news/${id}`;
const SINGLE_PRODUCT_ADMIN_URL = (id: String) =>
  `${MAIN_URL}/admin/product/${id}`;
const CATEGORY_URL = `${MAIN_URL}/admin/product/category`;
const PAGES_URL = `${MAIN_URL}/admin/page`;
const DELETE_IMAGE = `${MAIN_URL}/admin/image`;
const HOME_UI = `${MAIN_URL}/ui/home`;

export {
  MAIN_URL,
  GET_PROFILE,
  LOG_IN,
  LOG_OUT,
  SEARCH_PRODUCT,
  HOME_PRODUCT,
  ALL_PRODUCT,
  PRODUCT_DETAIL,
  SINGLE_PRODUCT,
  NEW_ORDER_URL,
  ALL_ORDER_URL,
  ORDER_DETAIL_URL,
  SCAN_BAR_CODE_URL,
  GET_PRODUCT_BARCODE_URL,
  CREATE_ARTICLE_URL,
  ALL_ARTICLE_ADMIN_URL,
  SINGLE_ARTICLE_URL,
  SINGLE_PRODUCT_ADMIN_URL,
  CATEGORY_URL,
  PAGES_URL,
  DELETE_IMAGE,
  HOME_UI,
};
