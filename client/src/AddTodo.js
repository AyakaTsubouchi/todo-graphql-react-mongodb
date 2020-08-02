import React from "react";

import { useMutation, gql } from "@apollo/client";
import { GET_TODOS, ADD_TODO } from "./queries/todoQueries";
import { Button, Input, Flex } from "@chakra-ui/core";
function AddTodo() {
  let input;

  //todo(I'm not sure what's going on ...)
  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  contents
                }
              `,
            });
            return existingTodos.concat(newTodoRef);
          },
        },
      });
    },
    refetchQueries: [{ query: GET_TODOS }],
  });
  const formSubmit = (e) => {
    e.preventDefault();
    addTodo({ variables: { contents: input.value } });
    input.value = "";
  };

  return (
    <>
      {" "}
      <Flex
        width="full"
        align="center"
        justifyContent="center"
        mb="30px"
        mt="30px">
        <Input
          ref={(node) => {
            input = node;
          }}
        />
        <Button onClick={formSubmit}>Add Todo</Button>
      </Flex>
    </>
  );
}

export default AddTodo;
