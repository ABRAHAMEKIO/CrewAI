import { Text, Spacer, Card } from '@nextui-org/react';
import React from 'react';

function CommentsCard() {
  return (
    <Card css={{ backgroundColor: '$gray100', mh: '30rem' }}>
      <Card.Header>
        <Text size={15} weight="semibold" color="$gray700">
          Comments
        </Text>
      </Card.Header>
      <Card.Body css={{ py: '0' }}>
        {(() => {
          const arr = [];
          for (let i = 0; i < 10; i += 1) {
            arr.push(
              <div key={i}>
                <Text size={12} weight="semibold" color="$gray700">
                  user {i}
                </Text>
                <Text size={15} weight="semibold">
                  comment {i}
                </Text>
                <Spacer y={0.2} />
                <Card.Divider />
                <Spacer y={0.5} />
              </div>
            );
          }
          return arr;
        })()}
      </Card.Body>
      <Card.Footer />
    </Card>
  );
}

export default CommentsCard;
