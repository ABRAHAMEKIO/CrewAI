import React, { useEffect, useState } from 'react';
import { useMixpanel } from 'react-mixpanel-browser';
import io from 'socket.io-client';
import { server, wsServer } from '../config';
import MidjourneyCommand from '../domain/midjourney/wsCommands';

import { errorBeep, successBeep } from '../domain/sounds/beep';
import { WebhookSuccessResponse } from '../domain/midjourney/midjourneyClient';

let socket;

function SocketClient(props: {
  onSocketSuccessResponse: (success: WebhookSuccessResponse | null) => void;
}) {
  const { onSocketSuccessResponse } = props;

  const mixpanel = useMixpanel();
  const [socketId, setSocketId] = useState(null);
  // const [historyResponse, setHistoryResponse] = useState<PromptHistory[]>([]);

  useEffect(() => {
    fetch(`${server}/api/socket`)
      .then(() => {
        socket = io(wsServer);

        socket.on(
          MidjourneyCommand.ModelResults.toString(),
          (val: WebhookSuccessResponse) => {
            if (val.prompt) {
              onSocketSuccessResponse(val);
              successBeep();
            } else {
              // console.log(val.content);
              errorBeep();
            }
          }
        );

        // socket.on(
        //   MidjourneyCommand.ModelResults.toString(),
        //   (val: WebhookSuccessResponse) => {
        //     if (mixpanel && mixpanel.config && mixpanel.config.token) {
        //       // Check that a token was provided (useful if you have environments without Mixpanel)
        //       // TODO: use enum for all metrics
        //       mixpanel.track('image_generation_success', {
        //         ...val,
        //       });
        //     }
        //     if (val.imageUrl) {
        //       setResponse(val);
        //       historyResponse.push({
        //         webhookSuccessResponse: val,
        //         prompt: val.content,
        //       });
        //       setHistoryResponse(historyResponse);
        //       storagePromptHistory.save(historyResponse);
        //       successBeep();
        //     } else {
        //       console.log(val.content);
        //       errorBeep();
        //     }
        //   }
        // );

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
  }, [onSocketSuccessResponse, mixpanel]);

  return <div>{/* Socket IO Init */}</div>;
}

export default SocketClient;
