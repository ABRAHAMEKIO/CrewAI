import {
  Button,
  Text,
  Modal,
  Link,
  Grid,
  Card,
  Spacer,
  Row,
  Avatar,
  Badge,
} from '@nextui-org/react';
import React from 'react';
import icons from './Icons';

function DetailImageModal(props: {
  modalOpen: boolean;
  modalClose: () => void;
}) {
  const { modalOpen, modalClose } = props;
  return (
    <Modal
      aria-labelledby="modal-title"
      open={modalOpen}
      width="60rem"
      scroll
      blur
    >
      <Modal.Body>
        <Grid.Container gap={2}>
          <Grid xs={12} sm={8}>
            <Card isPressable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src="https://ordin.s3.amazonaws.com/inscriptions/e7871759749df7420334cbb3ecde93cf989f383e04562375a32f793de0a8ab6bi0"
                  objectFit="cover"
                  width="100%"
                  alt="Default Image"
                />
                <Card.Footer
                  css={{
                    justifyItems: 'flex-start',
                    backgroundColor: '$gray100',
                  }}
                >
                  <Row justify="flex-end" align="center">
                    <Avatar icon={icons.heart} squared />
                    <Text size="sm">123</Text>
                    <Avatar icon={icons.arrowUp} squared />
                    <Text size="sm">123</Text>
                    <Avatar icon={icons.chat} squared />
                    <Text size="sm">123</Text>
                  </Row>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={4}>
            <Card css={{ backgroundColor: '$gray100', mw: '100rem' }}>
              <Card.Body css={{ py: '$10' }}>
                <div>
                  <Text size={15} weight="semibold" color="$gray700">
                    Group ID
                  </Text>
                  <Link href="/">
                    <Text size={18} weight="semibold" color="secondary">
                      qwertyuiop
                    </Text>
                  </Link>
                  <Spacer y={0.3} />
                  <Card.Divider height={2} />
                  <Spacer y={0.4} />
                </div>
                <div>
                  <Text size={15} weight="semibold" color="$gray700">
                    Member Prompt ID
                  </Text>
                  <Text size={18} weight="semibold">
                    poiuytrewq
                  </Text>
                  <Spacer y={0.3} />
                  <Card.Divider height={2} />
                  <Spacer y={0.4} />
                </div>
                <div>
                  <Text size={15} weight="semibold" color="$gray700">
                    Creator Name
                  </Text>
                  <Text size={18} weight="semibold">
                    zayn
                  </Text>
                  <Spacer y={0.3} />
                  <Card.Divider height={2} />
                  <Spacer y={0.4} />
                </div>
                <div>
                  <Text size={15} weight="semibold" color="$gray700">
                    Created
                  </Text>
                  <Text size={18} weight="semibold">
                    March 27, 2023, 1:30 PM GMT+7
                  </Text>
                  <Spacer y={0.3} />
                  <Card.Divider height={2} />
                  <Spacer y={0.4} />
                </div>
                <div>
                  <Text size={15} weight="semibold" color="$gray700">
                    Tags
                  </Text>
                  <Spacer y={0.3} />
                  <Grid.Container gap={0.5}>
                    {(() => {
                      const arr = [];
                      for (let i = 0; i < 5; i += 1) {
                        arr.push(
                          <Grid key={i}>
                            <Badge
                              isSquared
                              color="secondary"
                              variant="bordered"
                              size="md"
                              css={{
                                backgroundColor: '$gray100',
                              }}
                            >
                              Tags {i}
                            </Badge>
                          </Grid>
                        );
                      }
                      return arr;
                    })()}
                  </Grid.Container>
                  <Spacer y={0.3} />
                  <Card.Divider height={2} />
                  <Spacer y={0.4} />
                </div>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={6}>
            <Row>
              <Card css={{ backgroundColor: '$gray100' }}>
                <Card.Header>
                  <Text size={15} weight="semibold" color="$gray700">
                    Prompt
                  </Text>
                </Card.Header>
                <Card.Body css={{ py: '0' }}>
                  <Text size={20} weight="semibold">
                    &quot;sports car with color yellow in sepang circuit while
                    time afternoon&quot;
                  </Text>
                </Card.Body>
                <Card.Footer />
              </Card>
            </Row>
          </Grid>
          <Grid xs={12} sm={6}>
            <Card css={{ backgroundColor: '$gray100', mh: '30rem' }}>
              <Card.Header>
                <Text size={15} weight="semibold" color="$gray700">
                  Comments
                </Text>
              </Card.Header>
              <Card.Body css={{ py: '0' }}>
                {(() => {
                  const arr = [];
                  for (let i = 0; i < 10; i += 1) {
                    arr.push(
                      <div key={i}>
                        <Text size={12} weight="semibold" color="$gray700">
                          user {i}
                        </Text>
                        <Text size={15} weight="semibold">
                          comment {i}
                        </Text>
                        <Spacer y={0.2} />
                        <Card.Divider />
                        <Spacer y={0.5} />
                      </div>
                    );
                  }
                  return arr;
                })()}
              </Card.Body>
              <Card.Footer />
            </Card>
          </Grid>
        </Grid.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="gradient" onPress={modalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailImageModal;
