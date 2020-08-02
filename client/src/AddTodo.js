import React from "react";

import { useMutation, gql } from "@apollo/client";
import { GET_TODOS, ADD_TODO } from "./queries/todoQueries";
import { Button } from "@chakra-ui/core";
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
    <div>
      <form onSubmit={formSubmit}>
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <Button onClick={formSubmit}>Add Todo</Button>
      </form>
    </div>
  );
}

export default AddTodo;
