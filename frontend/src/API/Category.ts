import axios from "axios";
import { CATEGORY_URL, MAIN_URL } from "./KalaURL";

export function getAllCategory(skip: Number, limit: Number) {
  return axios.get(CATEGORY_URL, { params: { skip, limit } });
}

export function getAllCategoryWeb() {
  return axios.get(`${MAIN_URL}/product/category/all`);
}

export function addNewCategory(cat: {
  name: String;
  routeName: String;
  avatar: [
    {
      file: File;
      url: String;
      mediaType: String;
      index: Number;
    }
  ];
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
  if (cat.avatar[0]?.file) {
    formData.append("avatar", cat.avatar[0].file);
  }
  if (cat.cover) {
    for (let i = 0; i < cat.cover.length; i++) {
      formData.append("cover", cat.cover[i].file);
    }
  }
  return axios.post(CATEGORY_URL, formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function updateCategory(cat: {
  name: String;
  routeName: String;
  avatar: [
    {
      file: File;
      url: String;
      mediaType: String;
      index: Number;
    }
  ];
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
  if (cat.avatar[0]?.file) {
    formData.append("avatar", cat.avatar[0].file);
  } else {
    formData.append("avatar", JSON.stringify(cat.avatar));
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
  return axios.put(CATEGORY_URL, formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function deleteCategory(id: String) {
  return axios.delete(CATEGORY_URL, { params: { id } });
}
