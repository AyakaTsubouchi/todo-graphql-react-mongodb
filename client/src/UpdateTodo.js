import React from "react";
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
} from "@chakra-ui/core";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from "./queries/todoQueries";

function UpdateTodo(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [
    updateTodo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_TODO, { refetchQueries: [{ query: GET_TODOS }] });
  const id = props.todoId;
  let input;
  const clickHandler = () => {
    console.log(id);
  };

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>
      <Button onClick={(e) => clickHandler()}>id</Button>

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
            <FormControl
              onSubmit={(e) => {
                e.preventDefault();
                updateTodo({ variables: { id, contents: input.value } });

                input.value = "";
              }}>
              <FormLabel>Todo</FormLabel>
              <Input ref={initialRef} placeholder="Todo" />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} contents="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateTodo;
