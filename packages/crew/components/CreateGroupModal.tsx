import {
  Button,
  Text,
  Modal,
  Input,
  FormElement,
  Loading,
  Tooltip,
  Grid,
  Avatar,
  Link,
  Card,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import icons from './Icons';

function CreateGroupModal(props: {
  modalOpen: boolean;
  modalClose: () => void;
  creatorPrompt: string;
  creatorParams: object;
  creatorImageUrl: string;
}) {
  const {
    modalOpen,
    modalClose,
    creatorPrompt,
    creatorParams,
    creatorImageUrl,
  } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [groupUrl, setGroupUrl] = useState(null);

  const [values, setValues] = useState({
    name: '',
    prompt: creatorPrompt,
    parametersFromPrompt: JSON.stringify(creatorParams),
    imageUrl: creatorImageUrl,
    userId: 1,
  });

  function handleChange(event: React.ChangeEvent<FormElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const response = await fetch('/api/group/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      setResponseData(data);
      setLoading(false);
      setGroupUrl(`${window.location.href}group/${data?.id}`);
    } else {
      setErrorMessage(data.error);
      setLoading(false);
    }
  }

  return (
    <Modal aria-labelledby="modal-title" open={modalOpen}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header>
          <Text id="modal-title" size={18} weight="bold" color="secondary">
            {responseData ? 'YOUR GROUP' : 'CREATE GROUP'}
          </Text>
        </Modal.Header>
        <Modal.Body>
          {responseData && (
            <>
              <Input
                readOnly
                bordered
                label="Name"
                value={responseData?.name}
              />
              <Input
                readOnly
                bordered
                label="Master Key"
                value={responseData?.masterKey}
                contentRight={
                  <Tooltip
                    content="Copy"
                    color="secondary"
                    placement="bottom"
                    css={{ zIndex: 10000 }}
                  >
                    {icons.copy}
                  </Tooltip>
                }
                contentClickable
                onContentClick={() => {
                  navigator.clipboard.writeText(responseData?.masterKey);
                }}
              />
              <Text size={14} css={{ my: 0, pl: 5 }} weight="medium">
                Url
              </Text>
              <Card variant="bordered">
                <Card.Body>
                  <Link color="secondary" href={groupUrl}>
                    {groupUrl}
                  </Link>
                </Card.Body>
              </Card>
              <Grid.Container gap={0.5} justify="flex-end">
                <Grid>
                  <Avatar
                    icon={icons.copy}
                    size="md"
                    onClick={() => {
                      navigator.clipboard.writeText(groupUrl);
                    }}
                    css={{ cursor: 'pointer' }}
                  />
                </Grid>
                <Grid>
                  <TwitterShareButton
                    url={groupUrl}
                    title={responseData?.name}
                    className="Demo__some-network__share-button"
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                </Grid>
              </Grid.Container>
            </>
          )}
          {!responseData && (
            <Input
              fullWidth
              status="default"
              bordered
              label="Name"
              placeholder="awesome group"
              onChange={(e) => handleChange(e)}
              required
              name="name"
            />
          )}
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
                'Create'
              )}
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CreateGroupModal;
