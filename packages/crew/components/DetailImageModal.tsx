import {
  Button,
  Text,
  Modal,
  Grid,
  Card,
  Row,
  Avatar,
} from '@nextui-org/react';
import React from 'react';
import icons from './Icons';
import CommentsCard from './CommentsCard';
import ImageInformationCard from './ImageInformationCard';

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
                  src="https://cdn.discordapp.com/attachments/1095455337290678335/1101329748547883078/shaeman111_sports_car_with_color_yellow_in_sepang_circuit_while_ca707996-22b0-4faa-adcd-2ccc80bbd647.png"
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
            <ImageInformationCard />
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
            <CommentsCard />
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
