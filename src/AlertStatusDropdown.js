import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDisclosure } from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from "@chakra-ui/core";
import { Tooltip } from "@chakra-ui/core";

const AlertStatusDropdown = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDropdown = (e) => {
    e.stopPropagation();
  };
  const handleInfo = (e) => {
    e.stopPropagation();
  };

  const openModal = (e) => {
    console.log(e);
  };

  return (
    <div style={{ display: "flex" }}>
      <select
        onClick={(e) => {
          handleDropdown(e);
        }}
        onChange={(e) => {
          openModal(e);
          onOpen();
        }}
        style={{ border: "none" }}
      >
        <option value="open">Open</option>
        <option value="acknowledged">Acknowldged</option>
        <option value="resolved">Resolved</option>
        <option value="suppressed">Suppressed</option>
        <option value="closed">Closed</option>
      </select>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Tooltip hasArrow label="Welcome home" placement="bottom">
        <AiOutlineInfoCircle />
      </Tooltip>
    </div>
  );
};
export default AlertStatusDropdown;
