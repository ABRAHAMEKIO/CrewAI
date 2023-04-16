import React from 'react';
import { Text } from '@nextui-org/react';

export function Header1(props: { content: string }): JSX.Element {
  const { content } = props;
  return (
    <Text
      h1
      size={32}
      css={{
        textGradient: '45deg, $blue600 -20%, $pink600 50%',
        marginTop: '1em',
      }}
      weight="bold"
    >
      {content}
    </Text>
  );
}
export function Header2(props: { content: string }): JSX.Element {
  const { content } = props;
  return (
    <Text
      h2
      size={26}
      css={{
        textGradient: '45deg, $purple600 -20%, $pink600 100%',
        marginTop: '0.5em',
      }}
      weight="bold"
    >
      {content}
    </Text>
  );
}
/* eslint-disable-next-line no-unused-vars */
export function Header3(props: { content: string }): JSX.Element {
  const { content } = props;
  return (
    <Text
      h3
      size={22}
      css={{
        textGradient: '45deg, $yellow600 -20%, $red600 100%',
        marginTop: '0.25em',
      }}
      weight="bold"
    >
      {content}
    </Text>
  );
}
