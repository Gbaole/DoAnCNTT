import axios from "axios";
import {
  ALL_ARTICLE_ADMIN_URL,
  CREATE_ARTICLE_URL,
  MAIN_URL,
  SINGLE_ARTICLE_URL,
} from "../API/KalaURL";

export function getAllNew(
  skip: Number,
  limit: Number,
  filter: any,
  admin: Boolean = false
) {
  if (admin) {
    return axios.get(ALL_ARTICLE_ADMIN_URL, {
      params: { skip, limit, filter },
    });
  } else {
    return axios.get(`${MAIN_URL}/news/allNews`, {
      params: { skip, limit, filter },
    });
  }
}

export function getNewById(id: String) {
  return axios.get(`${MAIN_URL}/news/find/${id}`);
}

//view new
export function viewNew(id: String) {
  return axios.post(`${MAIN_URL}/news/${id}/viewCount`);
}

//like new
export function likeNew(id: String) {
  return axios.post(`${MAIN_URL}/news/${id}/likeCount`);
}

//comment new
export function commentNew(id: String, name: String, comment: String) {
  return axios.post(`${MAIN_URL}/news/${id}/comments`, {
    name: name,
    content: comment,
  });
}

export function createArticle(article: {
  heading: String;
  type: String;
  coverImage: { url: String; uploaded: Boolean; file: File };
  content: String;
  priority: Number;
}) {
  const formData = new FormData();
  for (let att in article) {
    if (att == "coverImage") continue;
    formData.append(att, article[att]);
  }
  if (article.coverImage) {
    formData.append("coverImage", article.coverImage[0].file);
  }
  return axios.post(CREATE_ARTICLE_URL, formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function editArticle(article: {
  heading: String;
  type: String;
  coverImage: [
    {
      url: String;
      uploaded: Boolean;
      file: File;
      _id: String;
      name: String;
    }
  ];
  content: String;
  priority: Number;
  _id: String;
}) {
  const formData = new FormData();
  for (let att in article) {
    if (att == "coverImage") continue;
    formData.append(att, article[att]);
  }
  if (Number(article.coverImage.length) === 0) {
    formData.append("coverImage", "[]");
  } else {
    if (article.coverImage[0]?.name) {
      console.log(JSON.stringify(article.coverImage));

      formData.append("coverImage", JSON.stringify(article.coverImage));
    } else {
      if (article.coverImage[0]?.file) {
        formData.append("coverImage", article.coverImage[0].file);
      }
    }
  }
  return axios.put(SINGLE_ARTICLE_URL(article._id), formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function deleteArticle(_id: String) {
  return axios.delete(SINGLE_ARTICLE_URL(_id));
}
