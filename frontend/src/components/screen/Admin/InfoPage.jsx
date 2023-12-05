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
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ImagePicker from "../../widgets/ImagePicker";
import { setLoading } from "../../../Redux/Ducks/notyfyDux";
import TextEditor from "../../widgets/TextEditor";
import {
  addNewPage,
  deletePage,
  getAllPage,
  getSinglePage,
  updatePage,
} from "../../../API/Pages";

function InfoPage(props) {
  const dispatch = useDispatch();
  const { skip, limit } = useParams();
  const [detail, setDetail] = useState(null);
  const [pages, setPage] = useState({ count: 0, records: [], definition: [] });

  const fetchData = () => {
    dispatch(setLoading(true));
    getAllPage(skip, limit)
      .then((res) => {
        setPage(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const fetchDetail = (routeName) => {
    getSinglePage(routeName).then((res) => {
      setDetail({ ...res.data, mode: "edit" });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    dispatch(setLoading(true));
    addNewPage(detail)
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
    console.log(detail);
    dispatch(setLoading(true));
    updatePage(detail)
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
  const handleDelete = () => {
    // console.log(detail);
    dispatch(setLoading(true));
    deletePage(detail._id)
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

  const handleDetailChange = ({ target }) => {
    setDetail({ ...detail, [target.name]: target.value });
  };

  const handleDetailContentChange = (val) => {
    setDetail({ ...detail, content: val });
  };

  return (
    <>
      <Modal
        isOpen={detail}
        onClose={() => setDetail(null)}
        scrollBehavior="inside"
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Chi tiết trang {detail?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Tên bài viết</FormLabel>
              <Input
                type="text"
                value={detail?.name}
                name="name"
                onChange={handleDetailChange}
              />
              <FormHelperText>
                Tên ngắn gọn (hiển thị ở thanh điều hướng)
              </FormHelperText>
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
                    array: detail.cover,
                    setData: (param) => {
                      setDetail({ ...detail, cover: param });
                    },
                    id: "cover",
                  })}
                </Box>
              )}
              <FormHelperText>Ảnh ở đầu trang</FormHelperText>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Tiêu đề</FormLabel>
              <Input
                type="text"
                value={detail?.title ? detail?.title : ""}
                name="title"
                onChange={handleDetailChange}
              />
              <FormHelperText>Tiêu đề bài viết</FormHelperText>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Nội dung</FormLabel>
              {/* <Input
                type="text"
                value={detail?.content}
                name="content"
                onChange={handleDetailChange}
              /> */}
              <TextEditor
                value={detail?.content ? detail?.content : ""}
                onChange={handleDetailContentChange}
              />
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
          <Heading>Trang thông tin</Heading>
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
          array: pages.records,
          definition: pages.definition,
          onRowClick: (id) => {
            fetchDetail(pages.records[id].routeName);
          },
        })}
      </Flex>
    </>
  );
}

export default InfoPage;
