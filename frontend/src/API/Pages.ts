import axios from "axios";
import { PAGES_URL, MAIN_URL, HOME_UI } from "../API/KalaURL";

export function getAllPage(skip: Number, limit: Number) {
  return axios.get(PAGES_URL, { params: { skip, limit } });
}

export function getAllPageWeb() {
  return axios.get(`${MAIN_URL}/home/pages`);
}

export function getSinglePage(routeName: String) {
  return axios.get(`${MAIN_URL}/home/page`, { params: { routeName } });
}

export function addNewPage(cat: {
  name: String;
  routeName: String;
  cover: [
    {
      file: File;
      url: String;
      mediaType: String;
      index: Number;
    }
  ];
}) {
  const formData = new FormData();

  for (let att in cat) {
    if (att == "cover" || att == "avatar") continue;
    formData.append(att, cat[att]);
  }
  if (cat.cover) {
    for (let i = 0; i < cat.cover.length; i++) {
      formData.append("cover", cat.cover[i].file);
    }
  }
  return axios.post(PAGES_URL, formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function updatePage(cat: {
  name: String;
  routeName: String;
  cover: [
    {
      file: File;
      url: String;
      mediaType: String;
      index: Number;
    }
  ];
}) {
  const formData = new FormData();

  for (let att in cat) {
    if (att == "cover" || att == "avatar") continue;
    formData.append(att, cat[att]);
  }
  if (cat.cover) {
    for (let i = 0; i < cat.cover.length; i++) {
      if (cat.cover[i]?.file) {
        formData.append("cover", cat.cover[i].file);
      } else {
        formData.append("cover", JSON.stringify(cat.cover[i]));
      }
    }
  }
  return axios.put(PAGES_URL, formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function deletePage(id: String) {
  return axios.delete(PAGES_URL, { params: { id } });
}

export function getHomeUI() {
  return axios.get(HOME_UI);
}
