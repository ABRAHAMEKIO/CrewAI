import React, { useState } from 'react';
import {
  Container,
  Grid,
  Text,
  Card,
  Row,
  Badge,
  Dropdown,
  Spacer,
  Avatar,
  Image,
} from '@nextui-org/react';
import ReactStars from 'react-rating-stars-component';
import DetailImageModal from '../../components/DetailImageModal';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import icons from '../../components/Icons';

function Index() {
  const [detailImageModal, setDetailImageModal] = useState(false);
  const ToggleModal = () => setDetailImageModal(!detailImageModal);

  return (
    <Layout>
      <NavigationBar />
      <Container lg>
        <DetailImageModal
          modalOpen={detailImageModal}
          modalClose={ToggleModal}
        />
        <Spacer y={1} />
        <Row wrap="wrap" justify="space-between" css={{ zIndex: 1 }}>
          <Dropdown>
            <Dropdown.Button flat color="secondary">
              Popular Tags
            </Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
              <Dropdown.Item key="trends">Trends</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button flat color="secondary">
              Week
            </Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
              <Dropdown.Item key="day">Day</Dropdown.Item>
              <Dropdown.Item key="month">Month</Dropdown.Item>
              <Dropdown.Item key="year">Year</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
        <Spacer y={0.5} />
        <Grid.Container gap={1}>
          {(() => {
            const arr = [];
            for (let i = 0; i < 10; i += 1) {
              arr.push(
                <Grid key={i}>
                  <Badge
                    isSquared
                    color="secondary"
                    variant="bordered"
                    size="lg"
                  >
                    Tags {i}
                  </Badge>
                </Grid>
              );
            }
            return arr;
          })()}
        </Grid.Container>
        <Grid.Container gap={2}>
          {(() => {
            const arr = [];
            for (let i = 0; i < 10; i += 1) {
              arr.push(
                <Grid md={3} direction="column" key={i}>
                  <Card css={{ mw: '330px' }}>
                    <Card.Header>
                      <Text b>Title</Text>
                    </Card.Header>
                    <Card.Body>
                      <Image
                        css={{ mw: 320 }}
                        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                        alt="Default Image"
                        onClick={ToggleModal}
                      />
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
                </Grid>
              );
            }
            return arr;
          })()}
        </Grid.Container>
      </Container>
    </Layout>
  );
}

export default Index;
