import React from 'react';
import { Button, Container, Grid, Spacer, Text } from '@nextui-org/react';
import Image from 'next/image';
import Layout from '../../components/v1/Layout';
import NavigationBar from '../../components/v1/NavigationBar';

function Index() {
  const mailTo = () => {
    window.location.href = 'mailto:support@aido.la';
  };
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
                  Contact Us
                </Text>
              </div>
              <Text
                size={24}
                css={{
                  textAlign: 'center',
                }}
              >
                CrewAI is still in early stage of development, we&apos;re
                looking for early adopters, contributors, and supporters to help
                us build the best Generative AI utilities.
              </Text>
              <Spacer y={1.5} />
              <Text
                size={16}
                css={{
                  textAlign: 'center',
                }}
              >
                If you have any question or suggestion, please contact
              </Text>
              <Spacer y={0.25} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button
                  onPress={mailTo}
                  color="gradient"
                  css={{ maxWidth: '3rem', align: 'center' }}
                >
                  Our Support Email
                </Button>
                <Spacer y={1.5} />
                <Image
                  src="https://github.com/CrewAI.png"
                  width={100}
                  height={100}
                  alt="CrewAI's avatar"
                />
              </div>
            </Grid>
          </Grid.Container>
        </Container>
      </div>
    </Layout>
  );
}

export default Index;
