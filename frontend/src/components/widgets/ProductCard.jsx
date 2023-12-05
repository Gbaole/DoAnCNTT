import {
  Button,
  Card,
  Divider,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import HoverImg from "./HoverLeftnRightImg";
import { BsPlusCircle } from "react-icons/bs";
import { convertCurrency } from "../../Utils/toolkits";

function ProductCard({ navigate, item }) {
  return (
    <a href={`/candle/${item._id}`}>
      <Card
        m="2rem"
        boxShadow={"none"}
        w={"xs"}
        transitionDuration={"0.5s"}
        _hover={{ transform: "scale(1.05, 1.05)" }}
      >
        <HoverImg imgArray={item.thumbnail} />
        <Divider />
        <Stack px="1rem" py="1rem">
          <Button
            variant="ghost"
            onClick={() => {
              navigate("/candle/" + item._id);
            }}
          >
            <Text fontSize="xl" fontWeight="bold">
              {item.name}
            </Text>
          </Button>

          <HStack display="flex" justify="space-between">
            <Text fontSize="xl">{convertCurrency(item.price)}</Text>
            <IconButton
              bgColor="transparent"
              icon={<BsPlusCircle size={"1.75rem"} />}
            />
          </HStack>
        </Stack>
        <Divider />
      </Card>
    </a>
  );
}

export default ProductCard;
