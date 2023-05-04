import { Button, Image, Text } from '@nextui-org/react';
import React, { createContext, useContext, useState } from 'react';
import MidjourneyClient, {
  IsNaughtySuccessResponse,
  SuccessResponse,
  WebhookSuccessResponse,
} from '../domain/midjourney/midjourneyClient';
import { errorBeep } from '../domain/sounds/beep';
import { server } from '../config';

export const ImageResponseContext = createContext(undefined);

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
  const [loading, setLoading] = useContext(ImageResponseContext);
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

  function filterButton(
    buttons,
    allowed = ['U1', 'U2', 'U3', 'U4', 'V1', 'V2', 'V3', 'V4']
  ) {
    return buttons.filter((button) => allowed.includes(button));
  }

  return (
    <div>
      <div>
        <Image
          css={{ maxWidth: 550 }}
          src={response?.imageUrl}
          alt="Your amazing generative art"
        />
        {filterButton(response.buttons).length >= 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                marginTop: '2vh',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button.Group color="gradient" ghost>
                {filterButton(response.buttons).map((button) => (
                  <Button
                    disabled={loading}
                    type="button"
                    onPress={() => handleButton(button)}
                  >
                    {button}
                  </Button>
                ))}
              </Button.Group>
            </div>
            {loading && (
              <Text
                color="warning"
                style={{
                  marginTop: '1vh',
                }}
              >
                Loading...
              </Text>
            )}
          </div>
        )}
      </div>
      {!loading && error && (
        <Text color="error">Error while generating image: {errorMessage}</Text>
      )}
    </div>
  );
}

export default ImagineResponse;
