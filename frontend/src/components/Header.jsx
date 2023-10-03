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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  return (
    <>
      <Container
        maxW="100vw"
        h="10vh"
        justify="space-between"
        p={"4rem"}
        bgColor={"black"}>
        {isDesktop
          ? DesktopLayout({
              navigate,
            })
          : MobileLayout({
              navigate,
            })}
      </Container>
    </>
  );
}

export default Header;

const DesktopLayout = ({ navigate }) => (
  // <Box alignItems={"center"}>
  //   <Container bgColor={"red"} w="100vw" h="50vh">
  //     <Text>I Love U</Text>
  //   </Container>
  // </Box>
  <Flex w="100%" h="100%" alignItems="center">
    <BrandLogo />
    <SearchBar />
  </Flex>
);

const MobileLayout = ({ navigate }) => (
  <Box>
    <Text>Mobile Header</Text>
  </Box>
);
const BrandLogo = () => (
  <a href="/">
    <Image
      alt="E Commerce Logo"
      src="/HeaderLogo.svg"
      // minH={"10rem"}
      maxW={"7rem"}
    />
  </a>
);
