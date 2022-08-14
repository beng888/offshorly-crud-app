import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useAppContext } from 'src/context';

export default function AppModal() {
  const {
    Modal: [modal],
    closeModal,
  } = useAppContext();

  const { open, header, body, footer } = modal;

  return (
    <Modal isOpen={open} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        {header && <ModalHeader>{header}</ModalHeader>}
        <ModalCloseButton />
        {body && <ModalBody>{body}</ModalBody>}

        {footer ? (
          <ModalFooter>{footer}</ModalFooter>
        ) : (
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
