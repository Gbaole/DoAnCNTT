import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Stack,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillTrash3Fill, BsPlusSquare } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setLoading, showToast } from "../../Redux/Ducks/notyfyDux";
import { deleteCloudImage } from "../../API/Media";
// import ConfirmModal from "./ConfirmModal";

function ImagePicker({
  array,
  setData,
  id,
  single = false,
  handleUpdateForm = () => {},
}) {
  const ref = document.getElementById(id);
  const dispatch = useDispatch();

  const handleAddImg = (e) => {
    const files = Array.from(e.target.files);
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        setData([
          ...array,
          {
            file: files[i],
            url: e.target.result,
            mediaType: files[0].type,
            index: array.length,
          },
        ]);
      };
    }
  };

  const handleRemoveImg = (index) => {
    dispatch(setLoading(true));
    deleteCloudImage(array[index].name)
      .catch((e) => {
        dispatch(
          showToast({
            title: e.response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
        const updatedimage = [...array];
        updatedimage.splice(index, 1);
        setData(updatedimage);
        handleUpdateForm();
      });
    // console.log(rm);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("imageIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData("imageIndex");
    if (dragIndex === dropIndex) {
      return;
    }

    const newimage = [...array];
    const dragImage = newimage[dragIndex];
    newimage[dragIndex] = newimage[dropIndex];
    newimage[dropIndex] = dragImage;

    setData(newimage);
  };
  return (
    <>
      <input
        type="file"
        multiple
        id={id}
        style={{ display: "none" }}
        onChange={handleAddImg}
      ></input>
      <Wrap spacing={2} mt={4}>
        {array.map((image, index) => (
          <Flex
            key={index}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <Image
              src={image.url}
              alt={`Image ${index}`}
              w="10rem"
              h="10rem"
              objectFit="cover"
              borderRadius="1rem"
            />
            <Button
              mt={2}
              onClick={() => handleRemoveImg(index)}
              // onClick={() => {
              //   setShowDelete(true);
              // }}
            >
              <BsFillTrash3Fill />
            </Button>
          </Flex>
        ))}
        {(array.length < 1 || !single) && (
          <Button
            onClick={() => {
              if (ref) {
                ref.click();
              } else {
                setData([...array]);
              }
            }}
            w="10rem"
            h="10rem"
          >
            <BsPlusSquare />
          </Button>
        )}
      </Wrap>
    </>
  );
}

export default ImagePicker;
