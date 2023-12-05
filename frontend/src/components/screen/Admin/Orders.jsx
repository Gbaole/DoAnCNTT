import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { getAllOrder } from "../../../API/Order";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../Redux/Ducks/notyfyDux";
import { useParams, useNavigate } from "react-router-dom";
import DynamicTable from "../../widgets/DynamicTable";
import Paginator from "../../widgets/Paginator";
import OrderDetailModal from "../../widgets/OrderDetailModal";

function Orders(props) {
  const dispatch = useDispatch();
  const { skip, limit } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState({ count: 0, totalPrice: 0, orders: [] });
  const mobile = useBreakpointValue({
    base: true,
    md: false,
  });
  const [showDetail, setShowDetail] = useState(false);
  const [detailID, setDetailID] = useState();

  useEffect(() => {
    dispatch(setLoading(true));
    getAllOrder(skip, limit)
      .then((res) => {
        setOrders(res.data);
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
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [skip, limit]);
  return (
    <>
      <OrderDetailModal
        isOpen={showDetail}
        onClose={() => {
          setShowDetail(false);
        }}
        mdh={detailID}
      />
      <Box justifyContent="start" maxW="100vw" p={mobile ? 0 : undefined}>
        <Flex w={"100%"} justify={"space-between"} align={"center"}>
          <Heading>Đơn hàng</Heading>
          <Text>Tổng {orders.count} đơn hàng</Text>
        </Flex>
        {DynamicTable({
          array: orders.orders,
          definition: orders.definition,
          onRowClick: (id) => {
            setShowDetail(true);
            setDetailID(orders.orders[id].mdh);
          },
        })}
        {Paginator({
          count: orders.count,
          skip,
          limit,
          setSkip: (sk) => {
            navigate(`/administrator/orders/${sk}/${limit}`);
          },
        })}
      </Box>
    </>
  );
}

export default Orders;
