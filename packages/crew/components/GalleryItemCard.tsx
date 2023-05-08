import { Text, Grid, Card, Avatar, Image, Row } from '@nextui-org/react';
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import icons from './Icons';

function GalleryItemCard(props: { imgSrc: string; id: string; title: string }) {
  const { imgSrc, title, id } = props;
  return (
    <Card css={{ mw: '330px' }} key={id}>
      <Card.Header>
        <Text b>{title}</Text>
      </Card.Header>
      <Card.Body>
        <Image css={{ mw: 320 }} src={imgSrc} alt="Default Image" />
      </Card.Body>
      <Card.Footer>
        <Row wrap="wrap" justify="space-between" align="center">
          <div>
            <Text size="sm" b>
              (123)
            </Text>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
          <div>
            <Grid.Container gap={1} justify="center">
              <Grid>
                <Avatar icon={icons.heart} squared />
                <Text size="sm" css={{ textAlign: 'center' }}>
                  (123)
                </Text>
              </Grid>
              <Grid>
                <Avatar icon={icons.arrowUp} squared />
                <Text size="sm" css={{ textAlign: 'center' }}>
                  (123)
                </Text>
              </Grid>
              <Grid>
                <Avatar icon={icons.chat} squared />
                <Text size="sm" css={{ textAlign: 'center' }}>
                  (123)
                </Text>
              </Grid>
            </Grid.Container>
          </div>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default GalleryItemCard;
