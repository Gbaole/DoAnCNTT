import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Wrap,
  Heading,
} from "@chakra-ui/react";
import ImagePicker from "../widgets/ImagePicker";
import { BsPlusSquare, BsTrash } from "react-icons/bs";
import TextEditor from "../widgets/TextEditor";
import { useSelector } from "react-redux";
import { useState } from "react";

function ProductForm({
  formData,
  content = "",
  setContent = () => {},
  handleInputChange = () => {},
  handleSubmit = () => {},
  productType = [],
  setProductype = () => {},
  thumbnails,
  setThumbnails = () => {},
  ecomURL = [],
  setEcomUrl = () => {},
}) {
  const categories = useSelector((state) => state.ui.category);

  return (
    <Flex>
      <FormControl>
        <FormLabel mt={"1rem"}>Tên sản phẩm</FormLabel>
        <Input
          type="text"
          placeholder="Tên sản phẩm"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <FormLabel mt={"1rem"}>Giá</FormLabel>
        <Input
          type="number"
          placeholder="Giá"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <FormLabel mt={"1rem"}>Mô tả sản phẩm</FormLabel>
        {/* <Input
          type="text"
          placeholder="Mô tả sản phẩm"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        /> */}
        <TextEditor value={content ? content : ""} onChange={setContent} />

        <FormLabel mt={"1rem"}>Category</FormLabel>
        <Select
          name="category"
          onChange={handleInputChange}
          size={"lg"}
          placeholder="Chọn danh mục"
        >
          {categories.map((cat, id) => {
            return (
              <option key={id} value={cat.routeName}>
                {cat.name} - #{cat.routeName}
              </option>
            );
          })}
        </Select>

        <FormLabel mt={"1rem"}>Thumbnail</FormLabel>
        <Box my={4}>
          {ImagePicker({
            array: thumbnails,
            setData: setThumbnails,
            id: "thumbnail",
            handleUpdateForm: handleSubmit,
          })}
        </Box>
        <Box>
          <FormLabel mt={"1rem"}>Phân loại sản phẩm</FormLabel>
          <Wrap w={"100%"}>
            {productType.map((type, id) => {
              const imgArray = productType[id].image;
              const setImgArray = (array) => {
                const tmp = [...productType];
                tmp[id].image = array;
                setProductype(tmp);
              };
              return (
                <Box key={id}>
                  <Card m={4}>
                    <CardBody>
                      <Flex w={"100%"} justify={"space-between"}>
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          Phân loại {id + 1}
                        </Text>
                        <Button
                          onClick={() => {
                            const newPT = [];
                            productType.map((type, id2) => {
                              if (id2 !== id) {
                                newPT.push(type);
                              }
                            });
                            setProductype(newPT);
                          }}
                        >
                          <BsTrash />
                        </Button>
                      </Flex>
                      <Input
                        type="text"
                        placeholder="Tên"
                        mt={3}
                        value={productType[id].name}
                        onChange={(e) => {
                          const newPT = [...productType];
                          newPT[id].name = e.target.value;
                          setProductype(newPT);
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Giá"
                        mt={3}
                        value={productType[id].price}
                        onChange={(e) => {
                          const newPT = [...productType];
                          newPT[id].price = e.target.value;
                          setProductype(newPT);
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Tồn kho"
                        mt={3}
                        value={productType[id].stock}
                        onChange={(e) => {
                          const newPT = [...productType];
                          newPT[id].stock = e.target.value;
                          setProductype(newPT);
                        }}
                      />
                      {ImagePicker({
                        array: imgArray,
                        setData: setImgArray,
                        id: "pt" + id,
                        handleUpdateForm: handleSubmit,
                      })}
                    </CardBody>
                  </Card>
                </Box>
              );
            })}
          </Wrap>
          <Button
            mt={4}
            onClick={() => {
              setProductype([
                ...productType,
                { name: "", stock: "", price: "", image: [] },
              ]);
            }}
            w="4rem"
            h="4rem"
          >
            <BsPlusSquare />
          </Button>
        </Box>
        <Box>
          <FormLabel mt={"1.5rem"}>
            Liên kết đến website thương mại khác:
          </FormLabel>
          <Wrap w={"100%"} p={4}>
            {ecomURL.map((item, id) => {
              return (
                <Card key={id} m={4} shadow={"lg"}>
                  <CardBody>
                    <Flex w={"100%"} align={"end"}>
                      <Flex flexDir={"column"}>
                        <FormLabel mt={"1rem"}>Chọn sàn TMĐT:</FormLabel>
                        <Select
                          name="category"
                          onChange={({ target }) => {
                            const ecom = [...ecomURL];
                            ecom[id].platform = target.value;
                            setEcomUrl(ecom);
                          }}
                          value={ecomURL[id].platform}
                        >
                          <option value={"shopee"}>Shopee</option>
                          <option value={"lazada"}>Lazada</option>
                          <option value={"tiki"}>Tiki</option>
                          <option value={"sendo"}>Sendo</option>
                          <option value={"amazon"}>Amazon</option>
                          <option value={"alibaba"}>Alibaba</option>
                          <option value={"taobao"}>Taobao</option>
                        </Select>
                      </Flex>
                      <Box w={"80%"} ml={"1rem"}>
                        <FormLabel mt={"1rem"}>Đường dẫn</FormLabel>
                        <Input
                          w={"xl"}
                          type="text"
                          placeholder="https://..."
                          name="description"
                          value={ecomURL[id].url}
                          isInvalid={
                            !ecomURL[id].url.match(
                              /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/
                            )
                          }
                          onChange={({ target }) => {
                            const ecom = [...ecomURL];
                            ecom[id].url = target.value;
                            setEcomUrl(ecom);
                          }}
                        />
                      </Box>
                      <Button
                        onClick={() => {
                          const newURL = [];
                          ecomURL.map((url, id2) => {
                            if (id2 !== id) {
                              newURL.push(url);
                            }
                          });
                          setEcomUrl(newURL);
                        }}
                      >
                        <BsTrash />
                      </Button>
                    </Flex>
                  </CardBody>
                </Card>
              );
            })}
          </Wrap>
          <Button
            mt={4}
            onClick={() => {
              setEcomUrl([...ecomURL, { platform: "shopee", url: "" }]);
            }}
            w="4rem"
            h="4rem"
          >
            <BsPlusSquare />
          </Button>
        </Box>
        <Flex mt={4}>
          <Button mr={4} onClick={handleSubmit} autoFocus>
            Xác nhận
          </Button>
          <Button
            onClick={() => {
              console.log(formData);
            }}
          >
            log
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
}

export default ProductForm;
