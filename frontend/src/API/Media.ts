import axios from "axios";
import { DELETE_IMAGE } from "./KalaURL";

export function deleteCloudImage(name: String) {
  return axios.delete(DELETE_IMAGE, { params: { name } });
}
