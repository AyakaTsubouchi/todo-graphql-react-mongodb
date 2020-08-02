import { gql } from "@apollo/client";

const GET_USERS_QUERY = gql`
  query {
    getUsers {
      id
      username
      email
      image
    }
  }
`;

const DELETE_USER_MUTATION = gql`
mutation {
    deleteUser(
      id
    )
  }
  `;

const ADD_USER_MUTATION = gql`
mutation {
    addUser(
      username,
      email
    ){
      id
      username
      email
      image
    }
  }
`;

//ToDo

export { GET_USERS_QUERY, DELETE_USER_MUTATION, ADD_USER_MUTATION };
