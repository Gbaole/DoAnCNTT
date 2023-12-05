import React, { useEffect, useRef, useState } from "react";
import TextEditor from "../../widgets/TextEditor";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  Image,
} from "@chakra-ui/react";
import { BsPlusSquare, BsTrash } from "react-icons/bs";
import {
  createArticle,
  deleteArticle,
  editArticle,
  getNewById,
} from "../../../API/News";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, showToast } from "../../../Redux/Ducks/notyfyDux";
import DangerConfirmDialog from "../../widgets/DangerConfirmDialog";

function NewsEditor() {
  const [formData, setFormData] = useState({
    heading: "",
    type: "",
    coverImage: [],
    content: "",
    priority: 1,
    caption: "",
  });

  const [content, setContent] = useState("<p></p>");
  const { name, skip } = useParams();
  const navigate = useNavigate();
  const thumb = useRef();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectThumb = (e) => {
    const file = Array.from(e.target.files);
    setFormData({
      ...formData,
      coverImage: [
        {
          url: URL.createObjectURL(file[0]),
          file: file[0],
          uploaded: false,
        },
      ],
    });
  };
  const handleSubmit = () => {
    formData.content = content;
    if (name == "addArticle") {
      dispatch(setLoading(true));
      createArticle(formData)
        .then(() => {
          dispatch(
            showToast({
              title: "Thêm sản phẩm thành công!",
              status: "success",
              duration: 2000,
              isClosable: true,
            })
          );
          navigate(-1);
        })
        .catch((e) => {
          dispatch(
            showToast({
              title: "Thêm sản phẩm thất bại! " + e.response.data.message,
              status: "error",
              duration: 2000,
              isClosable: true,
            })
          );
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else if (name == "editArticle") {
      // console.log(formData);
      delete formData.comment;
      dispatch(setLoading(true));
      editArticle(formData)
        .then(() => {
          dispatch(
            showToast({
              title: "Chỉnh sửa sản phẩm thành công!",
              status: "success",
              duration: 2000,
              isClosable: true,
            })
          );
          navigate(-1);
        })
        .catch((e) => {
          dispatch(
            showToast({
              title: "Chỉnh sửa sản phẩm thất bại! " + e.response.data.message,
              status: "error",
              duration: 2000,
              isClosable: true,
            })
          );
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const fetchArticle = async () => {
    if (name == "editArticle") {
      let res;
      dispatch(setLoading(true));
      try {
        res = await getNewById(skip);
        setContent(res.data.news.content);
        setFormData({ ...res.data.news });
      } catch (error) {
        // console.log(error);
        dispatch(
          showToast({
            title: error.response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        );
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
  useEffect(() => {
    fetchArticle();
  }, [skip]);
  return (
    <>
      {DangerConfirmDialog({
        isOpen: showDelete,
        onClose: () => {
          setShowDelete(null);
        },
        confirmHandler: (_id) => {
          dispatch(setLoading(true));
          deleteArticle(_id)
            .then(() => {
              navigate(-1);
              dispatch(
                showToast({
                  title: "Xóa bài viết thành công",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                })
              );
            })
            .catch((error) => {
              dispatch(
                showToast({
                  title: "Lỗi hệ thống!",
                  description: error.response.data.message,
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                })
              );
            })
            .finally(() => {
              dispatch(setLoading(false));
            });
        },
      })}
      <Flex w={"100%"} flexDirection={"column"}>
        <Flex w={"100%"} justify={"space-between"}>
          <Heading>
            {name == "editArticle" ? "Chỉnh sửa" : "Thêm bài viết mới"}
          </Heading>
          <Button
            colorScheme="red"
            onClick={() => {
              setShowDelete(formData._id);
            }}
          >
            Xóa bài viết
          </Button>
        </Flex>

        <Flex flexDirection={"column"} w={"100%"} mt={4}>
          <FormControl mt={4}>
            <FormLabel>Tiêu đề</FormLabel>
            <Input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Phân loại</FormLabel>
            <Input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Độ ưu tiên</FormLabel>
            <Select name="priority" onChange={handleInputChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Thumbnail</FormLabel>
            <Input
              type="file"
              style={{ display: "none" }}
              ref={thumb}
              multiple={false}
              onChange={handleSelectThumb}
            />
            {formData.coverImage.length === 0 ? (
              <Button
                onClick={() => {
                  thumb.current.click();
                }}
                w="10rem"
                h="10rem"
              >
                <BsPlusSquare />
              </Button>
            ) : (
              <Flex flexDir={"column"} align={"start"}>
                <Flex justifyContent={"center"} flexDir={"column"}>
                  <Image
                    src={formData?.coverImage[0]?.url}
                    h={"20rem"}
                    w={"25rem"}
                    objectFit={"cover"}
                  />
                  <Button
                    w={"auto"}
                    onClick={() => {
                      setFormData({ ...formData, coverImage: [] });
                    }}
                  >
                    <BsTrash />
                  </Button>
                </Flex>
              </Flex>
            )}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Tóm tắt</FormLabel>
            <Input
              type="text"
              name="caption"
              value={formData.caption}
              onChange={handleInputChange}
            />
          </FormControl>

          <Flex w={"100%"} mt={4} flexDir={"column"}>
            <FormLabel>Nội dung</FormLabel>
            <TextEditor value={content ? content : ""} onChange={setContent} />
          </Flex>
          <Flex w={"100%"} mt={4}>
            <Button onClick={handleSubmit}>Lưu</Button>
            {/* <Button
            onClick={() => {
              console.log(formData);
            }}
          >
            test
          </Button> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default NewsEditor;
