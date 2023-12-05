import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Ducks/UserDux";
import { BsCart } from "react-icons/bs";
import CartDrawer from "../widgets/CartDrawer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenCart, onOpenCart] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("primary.200", "primaryDark.200");
  const token = useSelector((state) => state.user.token);
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const cartCount = useSelector((state) => state.cart.count);
  const categories = useSelector((state) => state.ui.category);
  const pages = useSelector((state) => state.ui.pages);

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 192) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {CartDrawer({
        isOpen: isOpenCart,
        onClose: () => {
          onOpenCart(false);
        },
        token,
      })}

      <Container
        maxW="100vw"
        h={"4rem"}
        background={bg}
        position={"fixed"}
        justify="space-between"
        // alignItems="center"
        zIndex="6"
        display={
          window.location.pathname == "/"
            ? isScrolled
              ? "flex"
              : "none"
            : "flex"
        }
      >
        {isDesktop ? (
          DesktopLayout({
            navigate,
            handleLogout,
            token,
            onOpenCart,
            cartCount,
            pages,
          })
        ) : (
          <Flex w={"100%"} h="100%" align={"center"}>
            <BrandLogo />
            <Spacer />
            <Button onClick={onOpen}>
              <HamburgerIcon />
            </Button>
            {MobileLayout({
              navigate,
              onClose,
              isOpen,
              bg,
              pages,
            })}
          </Flex>
        )}
      </Container>
    </>
  );
};

export default Header;

const MobileLayout = ({ navigate, onClose, isOpen, bg, pages }) => (
  <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">
        <Heading>Kala menu</Heading>
        <DrawerCloseButton size="1rem" transform="translate(0,1rem)" />
      </DrawerHeader>
      <DrawerBody>
        <Box
          shadow="md"
          p="1rem"
          borderRadius="xl"
          mb="1rem"
          onClick={() => {
            navigate("/");
          }}
        >
          <Text>HOME</Text>
        </Box>
        <Box
          shadow="md"
          p="1rem"
          borderRadius="xl"
          mb="1rem"
          onClick={() => {
            navigate("/collections/all-products/0");
          }}
        >
          <Text>SHOP</Text>
        </Box>
        {pages.map((pg, id) => {
          // console.log(pg);
          return (
            <Box
              key={id}
              shadow="md"
              p="1rem"
              borderRadius="xl"
              mb="1rem"
              onClick={() => {
                navigate(`/info/${pg.routeName}`);
              }}
            >
              <Text>{pg.name}</Text>
            </Box>
          );
        })}
        <Box
          shadow="md"
          p="1rem"
          borderRadius="xl"
          mb="1rem"
          onClick={() => {
            navigate("/blog");
          }}
        >
          <Text>BLOG</Text>
        </Box>

        <Box
          shadow="md"
          p="1rem"
          borderRadius="xl"
          mb="1rem"
          bg={window.location.pathname == "/search" ? bg : undefined}
          onClick={() => {
            navigate("/cart");
          }}
        >
          <HStack>
            <BsCart />
            <Text>Giỏ Hàng</Text>
          </HStack>
        </Box>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);

const DesktopLayout = ({
  navigate,
  handleLogout,
  token,
  onOpenCart,
  cartCount,
  pages,
}) => (
  <Flex id="subcont" w={"100%"} h="100%" alignItems="center">
    <BrandLogo />
    <Spacer />
    <ButtonGroup variant="ghost">
      <Button onClick={() => navigate("/collections/all-products/0")}>
        SHOP
      </Button>
      {pages.map((pg, id) => {
        return (
          <Button key={id} onClick={() => navigate(`/info/${pg.routeName}`)}>
            {pg.name}
          </Button>
        );
      })}
      <Button onClick={() => navigate("/blog")}>BLOG</Button>
    </ButtonGroup>
    <Spacer />
    <ButtonGroup variant="ghost">
      <Button
        onClick={() => {
          onOpenCart(true);
        }}
      >
        <BsCart /> {"("}
        {cartCount}
        {")"}
      </Button>
      {token && (
        <IconButton
          me={5}
          aria-label="logout button"
          bgColor="transparent"
          onClick={handleLogout}
          icon={<BsBoxArrowInRight size={"1.75rem"} />}
        />
      )}
    </ButtonGroup>
  </Flex>
);

const BrandLogo = () => (
  <a href="/">
    <Image
      alt="Kala Candela logo"
      src={"/KalaHorizontal.svg"}
      // minH={"10rem"}
      minW={"10rem"}
      transform={"translate(0, -1rem)"}
    />
  </a>
);
