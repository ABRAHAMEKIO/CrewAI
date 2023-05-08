import React, { useState } from 'react';
import { Container, Grid, Row, Dropdown, Spacer } from '@nextui-org/react';
import Tag from '../../components/Tag';
import DetailImageModal from '../../components/DetailImageModal';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import GalleryItemCard from '../../components/GalleryItemCard';
import Group, { GroupAttributes } from '../../db/models/group';

export const getServerSideProps: () => Promise<{
  props: { data: GroupAttributes[] };
}> = async () => {
  const result = (
    await Group.findAll({ attributes: ['id', 'name', 'imageUrl'] })
  ).map((group) => group.dataValues);
  return { props: { data: result } };
};

// TODO: please fix this because this is only a temporary solution to the gallary rendering
function Index(props: { data: GroupAttributes[] }) {
  const [detailImageModal, setDetailImageModal] = useState(false);
  const ToggleModal = () => setDetailImageModal(!detailImageModal);
  const { data } = props;

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
          {data.map((item) => (
            <Grid md={3} direction="column" key={item.id}>
              <div onClick={ToggleModal} aria-hidden="true">
                <GalleryItemCard
                  imgSrc={item.imageUrl}
                  id={item.id}
                  title={item.name}
                />
              </div>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </Layout>
  );
}

export default Index;
