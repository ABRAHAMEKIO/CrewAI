import {
  Button,
  Text,
  Modal,
  Input,
  Spacer,
  FormElement,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import RandomStringGenerator from 'random-string-generator';

function CreateGroupModal(props: {
  modalOpen: boolean;
  modalClose: () => void;
  creatorPrompt: string;
  creatorParams: object;
}) {
  const { modalOpen, modalClose, creatorPrompt, creatorParams } = props;
  const router = useRouter();
  const [randomMasterKey] = useState(RandomStringGenerator(6));
  const [errorMessage, setErrorMessage] = useState(null);

  const [values, setValues] = useState({
    name: '',
    prompt: creatorPrompt,
    masterKey: randomMasterKey,
    parametersFormPrompt: JSON.stringify(creatorParams),
    userId: 1,
  });

  function handleChange(event: React.ChangeEvent<FormElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/group/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      router.push(`/group/${data.id}`);
    } else {
      setErrorMessage(data.error);
    }
  }

  return (
    <Modal aria-labelledby="modal-title" open={modalOpen}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header>
          <Text id="modal-title" size={18} weight="bold" color="secondary">
            CREATE GROUP
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            readOnly
            value={randomMasterKey}
            label="Master Key"
            status="default"
            bordered
            helperText="save your master key in notes"
            name="masterKey"
          />
          <Spacer y={0.5} />
          <Input
            fullWidth
            status="default"
            bordered
            label="Group ID"
            placeholder="awesome group"
            onChange={(e) => handleChange(e)}
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
          <Button auto flat color="gradient" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CreateGroupModal;
