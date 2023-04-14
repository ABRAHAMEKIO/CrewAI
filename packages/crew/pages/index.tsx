import {Button, Container, Image, Link, Navbar, Row, Text, Textarea, useTheme} from "@nextui-org/react";
import {Header1, Header2} from "../components/header";
import {EffectCallback, FormEvent, useEffect, useState} from "react";
import { useRouter } from "next/router";
import io from 'socket.io-client';
let socket;

import { server, wsServer } from '../config';
import {Command} from "../domain/midjourney/wsCommands";
import MidjourneyClient, {WebhookSuccessResponse} from "../domain/midjourney/midjourneyClient";
import { Layout } from "../components/Layout";

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
    <Layout>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            CrewAI
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">Customers</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Container>
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
    </Layout>
  );
}

export default Index;
