import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { SearchIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { debounce } from "lodash";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SEARCH_PRODUCT } from "../../API/KalaURL";
import { setLoading } from "../../Redux/Ducks/notyfyDux";
import { useDispatch } from "react-redux";

function ExtendSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const dispatch = useDispatch();

  const delayedSearch = useRef(
    debounce((searchQuery) => {
      if (searchQuery) {
        const getProductsURL = `${SEARCH_PRODUCT}?keyword=${searchQuery}`;
        axios
          .get(getProductsURL)
          .then((response) => {
            setSearchResults(response.data.products);
          })
          .catch((error) => {
            console.log("Error occurred while searching:", error);
          });
      }
    }, 500)
  ).current;

  const navigate = useNavigate();

  const handleSearch = () => {
    delayedSearch(input.trim());
    navigate("/allProduct");
    handleBlur();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    delayedSearch(value.trim());
  };

  const handleResultClick = (productId) => {
    // Perform redirection to the product details page
    // window.location.href = `/products/${productId}`;
    navigate(`/candle/${productId}`);
    handleBlur();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay the closing of the search box to allow clicking on search suggestions
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handleClose = () => {
    setIsFocused(false);
    setInput("");
    setSearchResults([]);
  };

  return (
    <VStack align="start" spacing={4}>
      <Button
        onClick={handleFocus}
        variant="unstyled"
        _focus={{ outline: "none" }}
      >
        {isFocused ? (
          <InputGroup>
            <Input
              type="text"
              placeholder="Kala Candela"
              value={input}
              onChange={handleInputChange}
              focusBorderColor="blue.500"
              borderRadius="none"
            />
            <InputRightAddon
              children={
                <HStack spacing={0}>
                  <Button
                    variant="unstyled"
                    _focus={{ outline: "none" }}
                    onClick={handleSearch}
                    type="submit"
                  >
                    <ArrowForwardIcon boxSize={5} alignSelf="center" />
                  </Button>
                  <Button
                    variant="unstyled"
                    _focus={{ outline: "none" }}
                    onClick={() => handleClose()}
                  >
                    <CloseIcon boxSize={4} alignSelf="center" />
                  </Button>
                </HStack>
              }
              bg="transparent"
              borderRadius="none"
              pointerEvents="auto"
              cursor="pointer"
            />
          </InputGroup>
        ) : (
          <Box>
            {isDesktop ? (
              <SearchIcon boxSize={5} />
            ) : (
              <Box color="gray.600">
                <HStack>
                  <SearchIcon boxSize={5} />
                  <Text>Tìm Kiếm</Text>
                </HStack>
              </Box>
            )}
          </Box>
        )}
      </Button>
      {/* Render search suggestions */}
      {isFocused && searchResults.length > 0 && (
        <Box
          position="absolute"
          zIndex="1"
          top="calc(100% + 4px)"
          left="0"
          width="100%"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          maxHeight="300px"
          overflowY="auto"
          onMouseDown={(e) => e.preventDefault()} // Prevent input blur on suggestion click
        >
          {searchResults.map((result) => (
            <Box
              key={result._id}
              display="flex"
              alignItems="center"
              p={2}
              borderBottomWidth="1px"
              borderBottomColor="gray.200"
              cursor="pointer"
              onClick={() => handleResultClick(result._id)}
            >
              {/* Display the product image */}
              <Box w={8} h={8} borderRadius="full" overflow="hidden" mr={2}>
                <img
                  src={result.image}
                  alt={result.name}
                  width="100%"
                  height="100%"
                />
              </Box>
              {/* Display the product name */}
              <Box>{result.name}</Box>
            </Box>
          ))}
        </Box>
      )}
    </VStack>
  );
}

export default ExtendSearch;
