import {
  Button,
  Grid,
  Image,
  PressEvent,
  Spacer,
  Text,
} from '@nextui-org/react';
import React, { useState } from 'react';
import MidjourneyClient, {
  IsNaughtySuccessResponse,
  SuccessResponse,
  WebhookSuccessResponse,
} from '../domain/midjourney/midjourneyClient';
import { errorBeep } from '../domain/sounds/beep';
import { server } from '../config';

// props :response
function ImagineResponse({ response }: { response: WebhookSuccessResponse }) {
  const midjourneyClient = new MidjourneyClient('', `${server}/api/thenextleg`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleButton(button: string): Promise<void> {
    const buttonResponse: SuccessResponse | IsNaughtySuccessResponse =
      await midjourneyClient.button(
        button,
        response.buttonMessageId,
        response.ref,
        ''
      );
    if ('isNaughty' in buttonResponse && buttonResponse.isNaughty) {
      setError(true);
      setErrorMessage(
        `there (are) prohibited phrase(s) ${buttonResponse.phrase}`
      );
      errorBeep();
      setLoading(false);
    } else {
      setLoading(true);
    }
  }

  return (
    <>
      <Spacer x={4} />
      <Grid direction="column" md={4} alignItems="center">
        <div style={{ marginTop: '4vh' }}>
          <Image
            css={{ maxWidth: 550 }}
            src={response?.imageUrl}
            alt="Your amazing generative art"
          />
        </div>
        <Spacer y={1} />
        <Button.Group color="gradient" ghost>
          <Button type="button" onPress={() => handleButton('v1')}>
            V 1
          </Button>
          <Button type="button" onPress={() => handleButton('v2')}>
            V 2
          </Button>
          <Button type="button" onPress={() => handleButton('v3')}>
            V 3
          </Button>
          <Button type="button" onPress={() => handleButton('v4')}>
            V 4
          </Button>
        </Button.Group>
        {!loading && error && (
          <Text color="error">
            Error while generating image: {errorMessage}
          </Text>
        )}
      </Grid>
    </>
  );
}

export default ImagineResponse;
