import { Badge } from '@nextui-org/react';
import React from 'react';

function Tag(props: { name: string }) {
  const { name } = props;
  return (
    <Badge
      isSquared
      color="secondary"
      variant="bordered"
      size="lg"
      css={{
        backgroundColor: '$gray100',
      }}
    >
      Tags {name}
    </Badge>
  );
}

export default Tag;
