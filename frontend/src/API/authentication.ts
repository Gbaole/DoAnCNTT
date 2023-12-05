import axios from "axios";
import { GET_PROFILE, LOG_IN, LOG_OUT } from "./KalaURL";
axios.defaults.withCredentials = true;

export function requsetUserProfile() {
  return axios.get(GET_PROFILE);
}

export function requestLogin(username: String, password: String) {
  return axios.post(LOG_IN, { username, password });
}

export function requestLogout() {
  return axios.get(LOG_OUT);
}
