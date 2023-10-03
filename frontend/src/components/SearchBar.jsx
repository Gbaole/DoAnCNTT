import {
  Box,
  HStack,
  useBreakpointValue,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  IconButton,
  Button,
  InputLeftElement,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { BsCart, BsPerson } from "react-icons/bs";

function SearchBar() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  return (
    <>
      <Box>
        {isDesktop
          ? DesktopLayout({
              navigate,
            })
          : MobileLayout({
              navigate,
            })}
      </Box>
    </>
  );
}

export default SearchBar;

const DesktopLayout = ({ navigate }) => (
  <Box>
    <HStack justifyContent="space-between">
      <InputGroup borderRadius="full">
        <Input
          type="text"
          placeholder="Search"
          borderRadius="full"
          focusBorderColor="hsl(39, 100%, 50%)"
          w="70vw"
          h="2.5rem"
        />
        {/* <InputRightElement
          pointerEvents="none"
          children={
            <IconButton
              fontSize="1rem"
              isRound={true}
              colorScheme="orange"
              icon={<SearchIcon />}
            />
          }
        /> */}

        <InputRightElement>
          <IconButton
            fontSize="1rem"
            isRound={true}
            colorScheme="orange"
            icon={<SearchIcon />}
          />
        </InputRightElement>
      </InputGroup>
      <Spacer />
      <Flex w="15rem" justifyContent="space-evenly">
        <IconButton
          fontSize="1.5rem"
          borderRadius="full"
          colorScheme="orange"
          icon={<BsCart />}
        />
        <IconButton
          fontSize="1.5rem"
          borderRadius="full"
          colorScheme="orange"
          icon={<BsPerson />}
        />
      </Flex>
    </HStack>
  </Box>
);

const MobileLayout = ({ navigate }) => (
  <Box>
    <Text>Mobile Header</Text>
  </Box>
);
