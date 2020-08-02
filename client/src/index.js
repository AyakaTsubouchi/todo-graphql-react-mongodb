import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import AddTodo from "./AddTodo";
import Todos from "./Todos";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App({ children }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CSSReset />
        {children}

        <div>
          <h2>Todo List using React,GraphQL,MongoDB</h2>
          <AddTodo />
          <Todos />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
