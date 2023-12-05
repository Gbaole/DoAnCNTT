import React, { useState } from "react";
import { Container, Flex, Heading, Button } from "@chakra-ui/react";
import { AddNewProduct } from "../../../API/Product";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../Redux/Ducks/notyfyDux";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../widgets/ProductForm";

// TODO them ghi chu cho cac muc

const AddProduct = () => {
  const [formData, setFormData] = useState(initialState);
  const [productType, setProductype] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [ecomUrl, setEcomUrl] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addNewProduct = (e) => {
    e.preventDefault();
    formData.thumbnail = convertImageFile(thumbnails);
    let newPT = [];
    // console.log(productType);
    for (let i = 0; i < productType.length; i++) {
      newPT.push({
        ...productType[i],
        image: convertImageFile(productType[i].image),
      });
    }
    formData.productType = newPT;
    // console.log(formData);
    dispatch(setLoading(true));
    AddNewProduct(formData)
      .then((response) => {
        // console.log(response);
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <Container justifyContent="start" maxW="container.fluid" padding={"1rem"}>
      <Flex my={3}>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Heading fontFamily="heading" ml={3}>
          Thêm sản phẩm
        </Heading>
      </Flex>
      <ProductForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={addNewProduct}
        productType={productType}
        setProductype={setProductype}
        thumbnails={thumbnails}
        setThumbnails={setThumbnails}
        ecomURL={ecomUrl}
        setEcomUrl={setEcomUrl}
        setContent={(tx) => {
          setFormData({ ...formData, description: tx });
        }}
        content={formData.description}
      />
    </Container>
  );
};

export default AddProduct;

const initialState = {
  name: "",
  price: "",
  description: "",
  category: "",
};

const convertImageFile = (array) => {
  const imgArray = [];
  const indexArray = Object.getOwnPropertyNames(array);
  for (let i = 0; i < indexArray.length - 1; i++) {
    imgArray.push(array[indexArray[i]].file);
  }
  return imgArray;
};
