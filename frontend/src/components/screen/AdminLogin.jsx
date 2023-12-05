import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  LightMode,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { getUser, login } from "../../Redux/Ducks/UserDux";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function AdminLogin() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const handleLogin = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    console.log(token);
    if (token) {
      navigate("/administrator/allproduct/0/20");
    }
    dispatch(getUser());
  }, [dispatch, token, navigate]);

  return (
    <Box
      w="100%"
      pt={"4rem"}
      minH="100vh"
      backgroundImage="url(/homeCandle2.jpg)"
      objectFit="cover"
    >
      <Container maxW="container.xl">
        <Center minH="90vh">
          <LightMode>
            <Card w="md" borderRadius="3xl">
              <CardBody>
                <Heading size="lg" fontFamily="basic">
                  Đăng nhập Kala Candela admin
                </Heading>
                <Center>
                  <VStack mt="3rem" w="sm">
                    <FormControl isRequired>
                      <FormLabel fontFamily="basic">Tên đăng nhập:</FormLabel>
                      <Input
                        fontFamily="basic"
                        placeholder="Tên đăng nhập..."
                        ref={usernameRef}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontFamily="basic">Mật khẩu:</FormLabel>
                      <Input
                        fontFamily="basic"
                        type="password"
                        ref={passwordRef}
                      />
                    </FormControl>
                    <Button
                      style={{ marginTop: "2rem" }}
                      fontFamily="basic"
                      type="submit"
                      onClick={handleLogin}
                      autoFocus
                    >
                      Đăng nhập
                    </Button>
                  </VStack>
                </Center>
              </CardBody>
            </Card>
          </LightMode>
        </Center>
      </Container>
    </Box>
  );
}

export default AdminLogin;
