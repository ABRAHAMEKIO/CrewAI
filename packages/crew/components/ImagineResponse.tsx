import { Button, Image, Spacer, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import MidjourneyClient, {
  IsNaughtySuccessResponse,
  SuccessResponse,
  WebhookSuccessResponse,
} from '../domain/midjourney/midjourneyClient';
import { errorBeep } from '../domain/sounds/beep';
import { server } from '../config';

export interface Reference {
  socketId: string;
  button: string;
}

function encodeReference(ref: Reference): string {
  return `${ref.socketId};${ref.button}`;
}

export function decodeReference(response: WebhookSuccessResponse): Reference {
  const [socketId = '', button = ''] = response.ref.split(';');
  return {
    socketId,
    button,
  };
}

// props :response
function ImagineResponse({ response }: { response: WebhookSuccessResponse }) {
  const midjourneyClient = new MidjourneyClient('', `${server}/api/thenextleg`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const reference = decodeReference(response);

  async function handleButton(button: string): Promise<void> {
    const ref = encodeReference({
      socketId: reference.socketId,
      button,
    });

    const buttonResponse: SuccessResponse | IsNaughtySuccessResponse =
      await midjourneyClient.button(button, response.buttonMessageId, ref, '');
    setLoading(true);
    // if ('isNaughty' in buttonResponse && buttonResponse.isNaughty) {
    //   setError(true);
    //   setErrorMessage(
    //     `there (are) prohibited phrase(s) ${buttonResponse.phrase}`
    //   );
    //   errorBeep();
    //   setLoading(false);
    // } else {
    //   setLoading(true);
    // }
  }

  return (
    <div>
      <Spacer x={4} />
      <div>
        <div style={{ marginTop: '4vh' }}>
          <Image
            css={{ maxWidth: 550 }}
            src={response?.imageUrl}
            alt="Your amazing generative art"
          />
        </div>
        <Spacer y={1} />
        <Button.Group color="gradient" ghost>
          {response.buttons.map((button) => (
            <Button type="button" onPress={() => handleButton(button)}>
              {button}
            </Button>
          ))}
        </Button.Group>
        {!loading && error && (
          <Text color="error">
            Error while generating image: {errorMessage}
          </Text>
        )}
      </div>
    </div>
  );
}

export default ImagineResponse;
