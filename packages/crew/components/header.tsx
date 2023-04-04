import {Text} from "@nextui-org/react";

export const Header1 = (props) => {
  const {content} = props;
  return <Text
    h1
    size={32}
    css={{
      textGradient: "45deg, $blue600 -20%, $pink600 50%",
    }}
    weight="bold"
  >{content}</Text>
}
export const Header2 = (props) => {
  const {content} = props;
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
  const {content} = props;
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
