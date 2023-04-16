import React from 'react';
import { Container } from '@nextui-org/react';
import Image from 'next/image';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import { Header1 } from '../../components/Heading';

function Index() {
  return (
    <Layout>
      <NavigationBar />
      <Container>
        <Header1 content="Contact Us" />
        <p>
          CrewAI is still in early stage of development, we&apos;re looking for
          early adopters, contributors, and supporters to help us build the best
          Generative AI utilities.
        </p>
        <Image
          src="https://github.com/CrewAI.png"
          width={400}
          alt="CrewAI's avatar"
        />
        <p>
          If you have any questions, please contact us at{' '}
          <a href="mailto:support@aido.la">our support email.</a>
        </p>
      </Container>
    </Layout>
  );
}

export default Index;
