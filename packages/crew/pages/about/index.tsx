import React from 'react';
import { Container } from '@nextui-org/react';
import Image from 'next/image';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import { Header1, Header2 } from '../../components/Heading';

function Index() {
  return (
    <Layout>
      <NavigationBar />
      <Container>
        <Header1 content="About us" />
        <p>
          CrewAI is crew of ambitious individuals exploring what&apos;s possible
          with the intersection of GenerativeAI and Web3.
        </p>
        <p>
          Our goal is to provide you with the best Generative AI utilities to
          express yourself in the new world where AI assist people to be more
          creative.
        </p>
        <Header2 content="Team" />
        <p>
          <strong>mpj</strong>
        </p>
        <Image
          src="https://github.com/empeje.png"
          width={400}
          alt="mpj's avatar"
        />
        <p>
          <em>mpj</em> is the lead developer at crew, he&apos;s long time hacker
          and developer and loves to read.
        </p>

        <p>
          <strong>huda</strong>
        </p>
        <Image
          src="https://github.com/hudakurniawan.png"
          width={400}
          alt="huda's avatar"
        />
        <p>
          <em>huda</em> is the product manager at crew, he&apos;s long time
          business developer and iot engineer.
        </p>
      </Container>
    </Layout>
  );
}

export default Index;
