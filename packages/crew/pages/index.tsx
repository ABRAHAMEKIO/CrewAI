import {Button, Container, Image, Row, Textarea, useTheme} from "@nextui-org/react";
import {Header1, Header2} from "../components/header";

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
      width={size || width || 24}
      height={size || height || 24}
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

  return (
    <Container>
      <Row justify="flex-end">
        <Button iconRight={<LockIcon fill="currentColor" filled size height
                                     width label />} color="secondary">
        Connect Wallet
        </Button>
      </Row>
      <Header1 content="CrewAI - A prompt-to-mint AI"/>
      <Header2 content="No need for sophisticated tool, use your word to create NFT"/>
      <Textarea
        label="Write your awesome AI prose here"
        placeholder="A raccoon that can speak and wield a sword"
      />
      <Image
        width={320}
        height={180}
        src="https://github.com/CrewAI.png"
        alt="Default Image"
        objectFit="none"
      />
      <Button color="gradient">Mint</Button>
    </Container>
  );
}

export default Index;
