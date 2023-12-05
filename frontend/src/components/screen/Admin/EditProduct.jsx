import { Button, Container, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "../../widgets/ProductForm";
import { getSingleProduct } from "../../../API/Product";
import { setLoading, showToast } from "../../../Redux/Ducks/notyfyDux";
import { RequestEditProduct } from "../../../API/Product";
import { getEditingProduct } from "../../../Redux/Ducks/adminDux";

function EditProduct(props) {
  const [formData, setFormData] = useState(initialState);
  const [productType, setProductype] = useState([]);
  const [ecomUrl, setEcomUrl] = useState([]);
  const [content, setContent] = useState("<p></p>");

  // const formData = useSelector(state=>state)

  const [thumbnails, setThumbnails] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    formData.thumbnail = thumbnails;
    formData.productType = productType;
    formData.ecomURL = ecomUrl;
    formData.description = content;
    // console.log(formData);
    dispatch(setLoading(true));
    RequestEditProduct(formData)
      .then((response) => {
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const id = useParams()["skip"];
  useEffect(() => {
    getSingleProduct(id)
      .then((res) => {
        setFormData(res.data.product);
        setThumbnails(res.data.product.thumbnail);
        setProductype(res.data.product.productType);
        setEcomUrl(res.data.product.ecomURL);
        setContent(res.data.product.description);
      })
      .catch((e) => {
        dispatch(
          showToast({
            title: e.response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        );
      });
    // dispatch(getEditingProduct(id));
  }, []);

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
          Chỉnh sửa sản phẩm
        </Heading>
      </Flex>
      {ProductForm({
        formData,
        handleInputChange,
        productType,
        setProductype,
        thumbnails,
        setThumbnails,
        handleSubmit: submitEdit,
        ecomURL: ecomUrl,
        setEcomUrl,
        content,
        setContent,
      })}
    </Container>
  );
}

export default EditProduct;

const initialState = {
  name: "",
  price: "",
  description: "",
  category: "",
};
