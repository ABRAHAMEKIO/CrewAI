import React from 'react';
import { Button, Container, Grid, Spacer, Text } from '@nextui-org/react';
import Image from 'next/image';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';

function Index() {
  const teams = [
    {
      name: 'mpj',
      image: 'https://github.com/empeje.png',
      description: `mpj is the lead developer at crew, he's long time hacker and developer and loves to read.`,
    },
    {
      name: 'huda',
      image: 'https://github.com/hudakurniawan.png',
      description: `huda is the product manager at crew, he's long time business developer and iot engineer.`,
    },
  ];
  return (
    <Layout>
      <NavigationBar />
      <div
        style={{
          paddingTop: '6rem',
        }}
      >
        <Container>
          <Grid.Container justify="center" gap={6}>
            <Grid xs={12} sm={5} direction="column" css={{ p: 0 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Text
                  h1
                  size={60}
                  css={{
                    textGradient: '45deg, $blue600 -20%, $pink600 50%',
                  }}
                  weight="bold"
                >
                  About Us
                </Text>
              </div>
              <Text
                size={24}
                css={{
                  textAlign: 'center',
                }}
              >
                CrewAI is crew of ambitious individuals exploring what&apos;s
                possible with the intersection of GenerativeAI and Web3.
              </Text>
              <Text
                size={24}
                css={{
                  textAlign: 'center',
                }}
              >
                Our goal is to provide you with the best Generative AI utilities
                to express yourself in the new world where AI assist people to
                be more creative.
              </Text>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '3rem',
                }}
              >
                <Text
                  h1
                  size={42}
                  css={{
                    textGradient: '45deg, $yellow600 -20%, $red600 100%',
                    alignItems: 'center',
                  }}
                  weight="bold"
                >
                  Meet the Team
                </Text>
                <Spacer y={1.5} />
              </div>
            </Grid>
          </Grid.Container>
        </Container>
        <Container sm>
          <Grid.Container justify="center" gap={2}>
            {teams.map((team) => {
              return (
                <Grid justify="center" xs={12} sm={6}>
                  <div
                    style={{
                      alignItems: 'center',
                      maxWidth: '300px',
                    }}
                  >
                    <Text size={28}>
                      <strong>{team.name}</strong>
                    </Text>
                    <Image
                      src={team.image}
                      width={300}
                      height={300}
                      alt={`${team.name} s avatar`}
                    />
                    <Text size={24}>{team.description}</Text>
                  </div>
                </Grid>
              );
            })}
          </Grid.Container>
        </Container>
      </div>
    </Layout>
  );
}

export default Index;
