import React from 'react';
import { Container, Text } from '@nextui-org/react';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';

function Detail() {
  return (
    <Layout>
      <NavigationBar />
      <Container>
        <Text>GROUP DETAIL</Text>
      </Container>
    </Layout>
  );
}

export default Detail;
