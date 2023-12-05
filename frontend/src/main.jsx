import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import { theme } from "./components/theme";
import "./mainstyle.css";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  //TODO add strict mode
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider resetCss={false} w="100%" theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>
);
