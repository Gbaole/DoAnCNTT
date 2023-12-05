import axios from "axios";
import { MAIN_URL } from "./KalaURL";

export async function addCustomer(email: String) {
  return axios.post(`${MAIN_URL}/customers/`, email);
}
