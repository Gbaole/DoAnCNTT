import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DynamicTable from "../../widgets/DynamicTable";
import {
  addNewCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../../../API/Category";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ImagePicker from "../../widgets/ImagePicker";
import { setLoading } from "../../../Redux/Ducks/notyfyDux";

function Category(props) {
  const dispatch = useDispatch();
  const { skip, limit } = useParams();
  const [detail, setDetail] = useState(null);
  const [cats, setCat] = useState({ count: 0, records: [], definition: [] });

  const fetchData = () => {
    dispatch(setLoading(true));
    getAllCategory(skip, limit)
      .then((res) => {
        setCat(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    dispatch(setLoading(true));
    addNewCategory(detail)
      .then((res) => {
        setDetail(null);
        fetchData();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleUpdate = () => {
    // console.log(detail);
    dispatch(setLoading(true));
    updateCategory(detail)
      .then((res) => {
        setDetail(null);
        fetchData();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleDetailChange = ({ target }) => {
    setDetail({ ...detail, [target.name]: target.value });
  };

  const handleDelete = () => {
    // console.log(detail);
    dispatch(setLoading(true));
    deleteCategory(detail._id)
      .then(() => {
        setDetail(null);
        fetchData();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <>
      <Modal
        isOpen={detail}
        onClose={() => setDetail(null)}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Chi tiết danh mục {detail?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Tên danh mục</FormLabel>
              <Input
                type="text"
                value={detail?.name}
                name="name"
                onChange={handleDetailChange}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>
                Mã {"("}#hashtag{")"}
              </FormLabel>
              <Input
                type="text"
                value={detail?.routeName}
                name="routeName"
                onChange={handleDetailChange}
              />
              <FormHelperText>Viết liền, không dấu</FormHelperText>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Thumbnail</FormLabel>
              {detail !== null && (
                <Box my={4}>
                  {ImagePicker({
                    array: detail.avatar,
                    setData: (param) => {
                      setDetail({ ...detail, avatar: param });
                    },
                    id: "avatar",
                    single: true,
                  })}
                </Box>
              )}
              <FormHelperText>Ảnh trên thanh điều hướng</FormHelperText>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Thumbnail</FormLabel>
              {detail !== null && (
                <Box my={4}>
                  {ImagePicker({
                    array: detail.cover,
                    setData: (param) => {
                      setDetail({ ...detail, cover: param });
                    },
                    id: "cover",
                  })}
                </Box>
              )}
              <FormHelperText>Ảnh ở đầu trang sản phẩm</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"space-between"}>
            {detail?.mode == "edit" && (
              <>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Xóa
                </Button>

                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  Cập nhật
                </Button>
              </>
            )}
            {detail?.mode == "add" && (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  handleAdd();
                }}
              >
                Thêm
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex w={"100%"} flexDir={"column"}>
        <Flex w={"100%"} justify={"space-between"}>
          <Heading>Danh mục sản phẩm</Heading>
          <Button
            borderRadius="2xl"
            onClick={() => {
              setDetail({
                mode: "add",
                name: "",
                routeName: "",
                avatar: [],
                cover: [],
              });
            }}
            mr={2}
          >
            <Tooltip label="Thêm" mr={2}>
              <AddIcon />
            </Tooltip>
          </Button>
        </Flex>
        {DynamicTable({
          array: cats.records,
          definition: cats.definition,
          onRowClick: (id) => {
            setDetail({ ...cats.records[id], mode: "edit" });
          },
        })}
      </Flex>
    </>
  );
}

export default Category;
