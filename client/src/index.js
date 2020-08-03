import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/core";

import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

// function index() {
//   return (
//     <ApolloProvider client={client}>
// <App/>
//     </ApolloProvider>
//   );
// }

// render(<App />, document.getElementById("root"));
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
