import axios from "axios";
import {
  GET_PRODUCT_BARCODE_URL,
  MAIN_URL,
  SCAN_BAR_CODE_URL,
  SINGLE_PRODUCT,
  SINGLE_PRODUCT_ADMIN_URL,
} from "../API/KalaURL";

export function GetAllProduct(skip: Number, limit: Number, type: String) {
  return axios.get(`${MAIN_URL}/products`, { params: { skip, limit, type } });
}

export function AddNewProduct(productObject: any) {
  const formData = new FormData();
  for (let att in productObject) {
    if (att === "thumbnail") {
      for (let i = 0; i < productObject.thumbnail.length; i++) {
        formData.append("thumbnail", productObject.thumbnail[i]);
      }
    } else if (att === "productType") {
      for (let i = 0; i < productObject.productType.length; i++) {
        formData.append(
          `productType_${i}_name`,
          productObject.productType[i].name
        );
        formData.append(
          `productType_${i}_stock`,
          productObject.productType[i].stock
        );
        formData.append(
          `productType_${i}_price`,
          productObject.productType[i].price
        );

        for (let j = 0; j < productObject.productType[i].image.length; j++) {
          formData.append(
            `productType_${i}_image`,
            productObject.productType[i].image[j]
          );
        }
      }
    } else if (att == "ecomURL") {
      if (productObject.ecomURL.length > 0) {
        formData.append(att, JSON.stringify(productObject[att]));
      } else {
        formData.append(att, "[]");
      }
    } else {
      formData.append(att, productObject[att]);
    }
  }
  return axios.post(`${MAIN_URL}/admin/product/new`, formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function getSingleProduct(id: String) {
  return axios.get(SINGLE_PRODUCT(id));
}

export function RequestEditProduct(productObject: any) {
  const formData = new FormData();
  for (let att in productObject) {
    if (att === "thumbnail") {
      for (let i = 0; i < productObject.thumbnail.length; i++) {
        if (productObject.thumbnail[i]?.name) {
          formData.append(
            "thumbnail",
            JSON.stringify(productObject.thumbnail[i])
          );
        } else {
          formData.append("thumbnail", productObject.thumbnail[i].file);
        }
      }
    } else if (att === "productType") {
      for (let i = 0; i < productObject.productType.length; i++) {
        formData.append(
          `productType_${i}_name`,
          productObject.productType[i].name
        );
        formData.append(
          `productType_${i}_stock`,
          productObject.productType[i].stock
        );
        formData.append(
          `productType_${i}_price`,
          productObject.productType[i].price
        );
        for (let j = 0; j < productObject.productType[i].image.length; j++) {
          if (productObject.productType[i].image[j]?.name) {
            formData.append(
              `productType_${i}_image`,
              JSON.stringify(productObject.productType[i].image[j])
            );
          } else {
            console.log(productObject.productType[i].image[j]);
            formData.append(
              `productType_${i}_image`,
              productObject.productType[i].image[j].file
            );
          }
        }
      }
    } else if (att == "ecomURL") {
      if (productObject.ecomURL.length > 0) {
        formData.append(att, JSON.stringify(productObject[att]));
      } else {
        formData.append(att, "[]");
      }
    } else {
      formData.append(att, productObject[att]);
    }
  }
  return axios.put(`${MAIN_URL}/admin/product/${productObject._id}`, formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function getProductFromBarcode(barcode: String) {
  return axios.get(SCAN_BAR_CODE_URL(barcode));
}

export function getProductBarcode(id: String) {
  return axios.get(GET_PRODUCT_BARCODE_URL(id));
}

export function deleteProduct(id: String) {
  return axios.delete(SINGLE_PRODUCT_ADMIN_URL(id));
}
