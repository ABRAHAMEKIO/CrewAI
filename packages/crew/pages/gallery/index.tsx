import React, { useState } from 'react';
import { Container, Grid, Row, Dropdown, Spacer } from '@nextui-org/react';
import Tag from '../../components/Tag';
import DetailImageModal from '../../components/DetailImageModal';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import GalleryItemCard from '../../components/GalleryItemCard';

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
                  <Tag name={i.toString()} />
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
                  <div onClick={ToggleModal} aria-hidden="true">
                    <GalleryItemCard imgSrc="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true" />
                  </div>
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
