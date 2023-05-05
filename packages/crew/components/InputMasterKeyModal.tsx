/* eslint-disable react/destructuring-assignment */
import { Button, Text, Modal, Input, Loading } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface Modal {
  modalOpen: boolean;
  modalClose: () => void;
  valid: (newIsValid: boolean) => void;
}

function InputMasterKeyModal(props: Modal) {
  const { modalOpen, modalClose } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [responseData, setResponseData] = useState(null);
  const [masterKey, setMasterKey] = useState(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(`/api/group/${id}/${masterKey}`, {
      method: 'POST',
    });

    const data = await response.json();

    if (response.ok) {
      setResponseData(data);
      props.valid(true);
      modalClose();
    } else {
      setLoading(false);
      props.valid(false);
      setErrorMessage(data.error);
      setLoading(false);
    }
  }

  return (
    <Modal aria-labelledby="modal-title" open={modalOpen}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header>
          <Text id="modal-title" size={18} weight="bold" color="secondary">
            REQUIRE MASTER KEY
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            fullWidth
            status="default"
            bordered
            clearable
            label="Master Key"
            placeholder="123456"
            onChange={(e) => {
              setMasterKey(e.target.value);
            }}
            onFocus={() => {
              setErrorMessage(null);
            }}
            required
            name="name"
          />
          {errorMessage && (
            <Text size={12} weight="semibold" color="$red600">
              {errorMessage}
            </Text>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => modalClose()}>
            Close
          </Button>
          {!responseData && (
            <Button color="gradient" type="submit" auto flat>
              {loading ? (
                <Loading
                  color="secondary"
                  type="points-opacity"
                  css={{ px: '0.6rem' }}
                />
              ) : (
                'Validate'
              )}
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default InputMasterKeyModal;
