import { Button, Text, Modal } from '@nextui-org/react';
import React from 'react';

function ErrorValidationModal(props: {
  modalOpen: boolean;
  modalClose: () => void;
  message: string;
}) {
  const { modalOpen, modalClose, message } = props;
  return (
    <Modal aria-labelledby="modal-title" open={modalOpen}>
      <Modal.Header>
        <Text id="modal-title" size={18} weight="bold" color="$red600">
          WARNING
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text weight="semibold">{message}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="gradient" onPress={() => modalClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorValidationModal;
