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
function Header() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  return (
    <>
      <Box w="100%" minH="100vh" mx={0}>
        <Container maxW="container.xxl" minH="100vh" mb={28} padding={0}>
          {isDesktop
            ? DesktopLayout({
                navigate,
              })
            : MobileLayout({
                navigate,
              })}
        </Container>
      </Box>
    </>
  );
}

export default Header;

const DesktopLayout = ({ navigate }) => (
  <Box alignItems={"center"}>
    <Container bgColor={"red"} w="100vw" h="50vh">
      <Text>I Love U</Text>
    </Container>
  </Box>
);

const MobileLayout = ({ navigate }) => (
  <Box>
    <Text>Mobile Header</Text>
  </Box>
);
