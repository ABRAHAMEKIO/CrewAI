import { Text, Button, Container, Image, useTheme, Textarea } from "@nextui-org/react";

const Header1 = (props) => {
  const { content } = props;
  return <Text
    h1
    size={32}
    css={{
      textGradient: "45deg, $blue600 -20%, $pink600 50%",
    }}
    weight="bold"
  >{content}</Text>
}

const Header2 = (props) => {
  const { content } = props;
  return <Text
    h2
    size={26}
    css={{
      textGradient: "45deg, $purple600 -20%, $pink600 100%",
    }}
    weight="bold"
  >
    {content}
  </Text>
}

const Header3 = (props) => {
  const { content } = props;
  return <Text
    h3
    size={22}
    css={{
      textGradient: "45deg, $yellow600 -20%, $red600 100%",
    }}
    weight="bold"
  >
    {content}
  </Text>
}
export function Index() {
  const { theme } = useTheme();

  return (
    <Container className="radialBackground">
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
