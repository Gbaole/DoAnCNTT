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
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function HomeScreen() {
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

export default HomeScreen;

const DesktopLayout = ({ navigate }) => (
  <Box>
    <Header></Header>
  </Box>
);

const MobileLayout = ({ navigate }) => (
  <Box>
    <Text>Mobile</Text>
  </Box>
);
