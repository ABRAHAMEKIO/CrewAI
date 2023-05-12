import React, { useEffect, useState } from 'react';
import { useMixpanel } from 'react-mixpanel-browser';
import io from 'socket.io-client';
import { server, wsServer } from '../config';
import MidjourneyCommand from '../domain/midjourney/wsCommands';
import MidjourneyClient, {
  IsNaughtySuccessResponse,
  SuccessResponse,
  WebhookSuccessResponse,
} from '../domain/midjourney/midjourneyClient';
import { PromptHistory, storagePromptHistory } from '../helpers/storage';
import { errorBeep, successBeep } from '../domain/sounds/beep';

let socket;

function SocketClient() {
  const mixpanel = useMixpanel();

  const midjourneyClient = new MidjourneyClient('', `${server}/api/thenextleg`);

  const [socketId, setSocketId] = useState(null);
  const [historyResponse, setHistoryResponse] = useState<PromptHistory[]>([]);
  const [response, setResponse] = useState(null as WebhookSuccessResponse);

  useEffect(() => {
    fetch(`${server}/api/socket`)
      .then(() => {
        socket = io(wsServer);

        socket.on(
          MidjourneyCommand.ModelResults.toString(),
          (val: WebhookSuccessResponse) => {
            if (mixpanel && mixpanel.config && mixpanel.config.token) {
              // Check that a token was provided (useful if you have environments without Mixpanel)
              // TODO: use enum for all metrics
              mixpanel.track('image_generation_success', {
                ...val,
              });
            }
            if (val.imageUrl) {
              setResponse(val);
              historyResponse.push({
                webhookSuccessResponse: val,
                prompt: val.content,
              });
              setHistoryResponse(historyResponse);
              storagePromptHistory.save(historyResponse);
              successBeep();
            } else {
              console.log(val.content);
              errorBeep();
            }
          }
        );

        socket.on(MidjourneyCommand.Connected.toString(), () => {
          // eslint-disable-next-line no-console
          console.info('connected');
          // eslint-disable-next-line no-console
          console.info(`${socket.id}`);
          setSocketId(socket.id);
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  }, [historyResponse, mixpanel]);

  useEffect(() => {
    const histories = storagePromptHistory.all();
    if (histories) {
      setHistoryResponse(histories);
    }
  }, []);

  async function handleSubmit(event, valueButton): Promise<void> {
    if (mixpanel && mixpanel.config && mixpanel.config.token) {
      const { command } = valueButton;
      // Check that a token was provided (useful if you have environments without Mixpanel)
      mixpanel.track('image_generation_requested', {
        command,
      });
    }

    const imagineResponse: SuccessResponse | IsNaughtySuccessResponse =
      await midjourneyClient.imagine(
        valueButton.command,
        `${socketId};${valueButton.parentId}`,
        ''
      );
    if ('isNaughty' in imagineResponse && imagineResponse.isNaughty) {
      console.log(`there (are) prohibited phrase(s) ${imagineResponse.phrase}`);
      await errorBeep();
    }
  }

  return (
    <button
      type="button"
      key={it.name}
      onClick={(e) =>
        handleSubmit(e, {
          command: 'item.prompt',
          parentId: '1',
        })
      }
    >
      BUTTON
    </button>
  );
}

export default SocketClient;
