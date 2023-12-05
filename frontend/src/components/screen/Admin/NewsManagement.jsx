import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAllNew } from "../../../API/News";
import DynamicTable from "../../widgets/DynamicTable";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../Redux/Ducks/notyfyDux";

function NewsManagement(props) {
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    count: 0,
    records: [],
    definition: [],
  });
  const { skip, limit } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    getAllNew(skip, limit, undefined, true)
      .then((res) => {
        setArticle(res.data.feedbackObject);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);
  return (
    <Flex w={"100%"} justify={"space-between"} flexDirection={"column"}>
      <Flex w={"100%"} justify={"space-between"}>
        <Heading>Bài viết</Heading>
        <Flex align={"center"}>
          <Button
            borderRadius="2xl"
            onClick={() => {
              navigate("/administrator/addArticle/0/0");
            }}
            mr={2}
          >
            <Tooltip label="Thêm bài viết" mr={2}>
              <AddIcon />
            </Tooltip>
          </Button>
        </Flex>
      </Flex>
      {DynamicTable({
        array: article.records,
        definition: article.definition,
        onRowClick: (id) => {
          navigate(`/administrator/editArticle/${article.records[id]._id}/0`);
        },
      })}
    </Flex>
  );
}

export default NewsManagement;
