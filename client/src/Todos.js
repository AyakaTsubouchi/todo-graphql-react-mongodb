import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from "./queries/todoQueries";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Icon,
} from "@chakra-ui/core";

function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [
    updateTodo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_TODO, { refetchQueries: [{ query: GET_TODOS }] });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateId, setUpdateId] = useState(null);
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>add todo</p>;
  {
    console.log(data);
  }

  return data.getTodos.map(({ id, contents, user }) => {
    let input;

    return (
      <div key={id}>
        <Flex>
          <Text w="80%" borderWidth={1}>
            {contents}
          </Text>
          <Text w="80%" borderWidth={1}>
            {id}
          </Text>

          <Button
            onClick={(e) => {
              console.log(id);
              deleteTodo({ variables: { id } });
            }}>
            <Icon name="delete" />
          </Button>
          <Button
            onClick={() => {
              onOpen();
              console.log(id);
              setUpdateId(id);
            }}>
            <Icon name="edit" />
          </Button>
        </Flex>
        {/* <UpdateTodo /> */}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Todo</FormLabel>
                <Input
                  placeholder="Todo"
                  ref={(node) => {
                    input = node;
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                variantColor="blue"
                mr={3}
                contents="submit"
                onClick={(e) => {
                  e.preventDefault();
                  updateTodo({
                    variables: { id: updateId, contents: input.value },
                  });
                  console.log(updateId);

                  input.value = "";
                }}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
      </div>
    );
  });
}

export default Todos;
