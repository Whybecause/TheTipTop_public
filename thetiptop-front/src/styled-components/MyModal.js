// Import Third-party Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {
  useDisclosure,
  Button,
  Icon,
  Modal, ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const MyModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue('brand.dark', 'white');

  React.useEffect(() => {
    if (props.closeModal === true) {
      onClose();
    }
  }, [props.closeModal]);

  React.useEffect(() => {
    if (props.openModal === true) {
      onOpen();
    }
  }, [props.openModal]);

  return (
    <>
      <Box w="max-content" onClick={onOpen}>{props.toggle}</Box>
      <Modal isOpen={isOpen} onClose={onClose} size={props.size}>
        <ModalOverlay />
        <ModalContent color={color}>
          {props.closeButton && (<ModalCloseButton />)}
          <ModalHeader>{props.header}</ModalHeader>
          <ModalBody>{props.body}</ModalBody>
          {props.displayFooter && (
            <ModalFooter d="flex" justifyContent="space-between">
              <div onClick={onClose}>{props.cancel}</div>
              <div onClick={onClose}>{props.confirm}</div>
              {props.isClosableBottom && (
                <Button onClick={onClose}><Icon as={CloseIcon} /></Button>
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

MyModal.propTypes = {
  toggle: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired,
  confirm: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cancel: PropTypes.string,
  isClosableBottom: PropTypes.bool,
  closeButton: PropTypes.bool,
  closeModal: PropTypes.bool,
  openModal: PropTypes.bool,
  size: PropTypes.string,
  displayFooter: PropTypes.bool,
};


export default MyModal;
