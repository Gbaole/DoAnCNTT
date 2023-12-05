import { extendTheme } from "@chakra-ui/react";
import { sizes } from "./size";
import { colors } from "./color";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  sizes,
  fonts: {
    heading: `'Darker Grotesque', sans-serif`,
    handWritten: "taken by vultures demo",
    bodySerif: "Buttershine Serif",
    body: `'Darker Grotesque', sans-serif`,
  },
  textStyles: {
    p: {
      fontSize: ["16px", "20px"],
      fontWeight: "500",
      lineHeight: "120%",
      letterSpacing: "0%",
    },
  },
  colors: colors,
});
