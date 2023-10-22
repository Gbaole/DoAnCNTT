import {
  Box,
  Container,
  Flex,
  HStack,
  useBreakpointValue,
  Text,
  Image,
  VStack,
  Card,
  CardBody,
  Heading,
  Button,
  Stack,
  Center,
  Wrap,
  CardFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  InputGroup,
  InputLeftElement,
  Input,
  Spacer,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

function Header() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  return (
    <Flex w="100vw">
      {isDesktop ? DesktopLayout(navigate) : MobileLayout(navigate)}
    </Flex>
  );
}

export default Header;

const DesktopLayout = ({ navigate }) => (
  <Box w="100%">
    <HStack display="flex" justify="center">
      <BrandLogo />

      <InputGroup maxW="40rem" mx="2rem">
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input type="text" placeholder="Search" />
      </InputGroup>

      <Popover>
        <PopoverTrigger>
          <IconButton
            icon={<AiOutlineShoppingCart />}
            fontSize="2xl"
            variant="ghost"
            mx="2rem"
          />
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader
            // bg="red.100"
            as="b"
            display="flex"
            justifyContent="center"
            fontSize="lg"
          >
            Giỏ hàng
          </PopoverHeader>
          <PopoverBody>Chưa có sản phẩm</PopoverBody>
          <Divider />
          <Button bg="orange.100">Thanh toán</Button>
        </PopoverContent>
      </Popover>
    </HStack>
  </Box>
);

const MobileLayout = ({ navigate }) => <Box w="100%" minH="10rem"></Box>;

const BrandLogo = () => (
  <a href="/">
    <Image
      m="2rem"
      alt="E Commerce Logo"
      src="/HeaderLogo.svg"
      minH={"7rem"}
      maxW={"8rem"}
    />
  </a>
);
