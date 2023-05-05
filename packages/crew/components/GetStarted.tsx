import React, { useEffect, useState, useMemo } from 'react';
import {
  Button,
  Container,
  PressEvent,
  Textarea,
  Text,
  Grid,
  Spacer,
  Collapse,
  Link,
  Image,
} from '@nextui-org/react';

const images = [
  'https://crew-ai.s3.ap-southeast-1.amazonaws.com/1683260909646_Fu-Kc2RaUAEKERb.jpeg',
  'https://crew-ai.s3.ap-southeast-1.amazonaws.com/1683260931065_FvMHr0bakAUD1HL.jpeg',
  'https://crew-ai.s3.ap-southeast-1.amazonaws.com/1683260974037_FvER45aacAAN7qL.jpeg',
];

function GetStarted({ onClick }: { onClick: () => void }) {
  return (
    <Container
      sm
      style={{
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          marginTop: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Text
          h2
          size={40}
          css={{
            textGradient: '45deg, $blue600 -20%, $pink600 50%',
            textAlign: 'center',
          }}
          weight="bold"
        >
          The Power of a studio in your hands using
        </Text>
        <Text
          h1
          size={60}
          css={{
            textGradient: '45deg, $yellow600 -20%, $red600 100%',
            textAlign: 'center',
          }}
          weight="bold"
        >
          {' '}
          Generative AI
        </Text>
        <Button
          color="gradient"
          auto
          css={{
            zIndex: '0',
            marginTop: '1rem',
          }}
          onPress={onClick}
        >
          Get Started for Free
        </Button>
      </div>

      <Grid.Container
        gap={2}
        justify="center"
        css={{
          marginTop: '1rem',
        }}
      >
        {images.map((image) => {
          return (
            <Grid xs={12} sm={4}>
              <Image src={image} objectFit="cover" alt="Default Image" />
            </Grid>
          );
        })}
      </Grid.Container>
    </Container>
  );
}

export default GetStarted;
