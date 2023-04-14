import {Button, Container, Image, Row, Textarea, useTheme} from "@nextui-org/react";
import {Header1, Header2} from "../components/header";
import {EffectCallback, FormEvent, useEffect, useState} from "react";
import { useRouter } from "next/router";
import io from 'socket.io-client';
let socket;

import { server, wsServer } from '../config';
import {Command} from "../domain/midjourney/wsCommands";
import MidjourneyClient, {WebhookSuccessResponse} from "../domain/midjourney/midjourneyClient";

export const LockIcon = ({
                           fill = 'currentColor',
                           filled,
                           size,
                           height,
                           width,
                           label,
                           ...props
                         }) => {
  return (
    <svg
      data-name="Iconly/Curved/Lock"
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || "24"}
      height={size || height || "24"}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          data-name="Stroke 1"
          d="M16.471 9.403V7.25a4.561 4.561 0 00-9.121-.016v2.169"
        />
        <path data-name="Stroke 3" d="M11.91 14.156v2.221" />
        <path
          data-name="Stroke 5"
          d="M11.91 8.824c-5.745 0-7.66 1.568-7.66 6.271s1.915 6.272 7.66 6.272 7.661-1.568 7.661-6.272-1.921-6.271-7.661-6.271z"
        />
      </g>
    </svg>
  );
};
export function Index() {
  const { theme } = useTheme();
  const [socketId, setSocketId] = useState(null);
  const [response, setResponse] = useState(null as WebhookSuccessResponse)
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const midjourneyClient = new MidjourneyClient("", `${server}/api/thenextleg/imagine`);

  // @ts-ignore
  useEffect(() => {
    fetch(`${server}/api/socket`).then(() => {
      socket = io(wsServer);

      socket.on(Command.ModelResults.toString(), (val: WebhookSuccessResponse) => {
        setResponse(val);
        setLoading(false);
      })

      socket.on(Command.Connected.toString(), () => {
        console.log('connected');
        setSocketId(socket.id);
      })
    }).catch((e) => {
      console.error(e);
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLButtonElement>): Promise<void> {
    await midjourneyClient.imagine(prompt, socketId, "");
    setLoading(true);
  }

  return (
    <Container>
      <Row justify="flex-end">
        <Button iconRight={<LockIcon fill="currentColor" filled size="24" height="24"
                                     width="24" label />} color="secondary">
        Connect Wallet
        </Button>
      </Row>
      <Header1 content="CrewAI - A prompt-to-mint AI"/>
      <Header2 content="No need for sophisticated tool, use your word to create NFT"/>
      <Textarea
        label="Write your awesome AI prose here"
        placeholder="A raccoon that can speak and wield a sword"
        onChange={(e) => setPrompt(e.target.value)}
      />
      {socketId && <p>Socket ID: {socketId}</p>}
      {response &&
        <Image
          width={1200}
          src={response?.imageUrl}
          alt="Your amazing generative art"
        />
      }
      {loading && <p>Loading...</p>}
      <Button color="gradient" onClick={handleSubmit}>Draw</Button>
    </Container>
  );
}

export default Index;
