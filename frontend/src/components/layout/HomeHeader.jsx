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
  Link,
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

const HomeHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenCart, onOpenCart] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("primary.200", "primaryDark.200");
  const token = useSelector((state) => state.user.token);
  const isDesktop = useBreakpointValue({
    base: false,
    md: false,
    lg: false,
    xl: true,
  });
  // console.log(isDesktop);
  const cartCount = useSelector((state) => state.cart.count);
  const pages = useSelector((state) => state.ui.pages);

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.outerHeight) {
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
        maxW="container.fluid"
        h={"12rem"}
        background={
          window.location.pathname == "/"
            ? isScrolled
              ? bg
              : "rgba(0,0,0,0.1)"
            : bg
        }
        position={window.location.pathname == "/" ? "relative" : "fixed"}
        justifyContent="center"
        alignItems="center"
        zIndex="6"
        backdropFilter="blur(9px)"
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
          <Flex h="100%" align={"center"}>
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
            })}
          </Flex>
        )}
      </Container>
    </>
  );
};

export default HomeHeader;

const MobileLayout = ({ navigate, onClose, isOpen, bg }) => (
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
  <Flex id="subcont" h="100%" w={"100%"} alignItems="center">
    <Link href="/" ml={"4rem"}>
      <BrandLogo vertical={window.location.pathname === "/"} />
    </Link>
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

const BrandLogo = ({ vertical = false }) => (
  <Image
    alt="Kala Candela logo"
    src={"/KalaVertical.svg"}
    h={"10rem"}
    minW={"10rem"}

    // transform={"translate(0, 4rem)"}
  />
);
