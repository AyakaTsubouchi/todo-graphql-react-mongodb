import { gql } from "@apollo/client";

const GET_TODOS = gql`
  {
    getTodos {
      id
      contents
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $contents: String!) {
    updateTodo(id: $id, contents: $contents) {
      id
      contents
    }
  }
`;
const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
const ADD_TODO = gql`
  mutation AddTodo($contents: String!) {
    addTodo(contents: $contents) {
      id
      contents
    }
  }
`;

export { GET_TODOS, UPDATE_TODO, DELETE_TODO, ADD_TODO };
