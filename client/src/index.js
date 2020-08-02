import React from "react";
import { render } from "react-dom";
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

import AddTodo from "./AddTodo";
import Todos from "./Todos";
import ThemeToggler from "./style/ThemeToggler";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />
          <ThemeToggler />
          <Flex width="full" align="center" justifyContent="center">
            <Box
              p={8}
              maxWidth="600px"
              borderWidth={1}
              borderRadius={8}
              boxShadow="lg">
              <Box textAlign="center">
                <Heading>Todo List </Heading>

                <AddTodo />
                <Todos />
              </Box>
            </Box>
          </Flex>
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
