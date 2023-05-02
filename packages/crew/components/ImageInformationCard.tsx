import { Text, Spacer, Card, Link, Grid } from '@nextui-org/react';
import React from 'react';
import Tag from './Tag';

function ImageInformationCard() {
  return (
    <Card css={{ backgroundColor: '$gray100', mw: '100rem' }}>
      <Card.Body css={{ py: '$10' }}>
        <div>
          <Text size={15} weight="semibold" color="$gray700">
            Group ID
          </Text>
          <Link href="/">
            <Text size={18} weight="semibold" color="secondary">
              qwertyuiop
            </Text>
          </Link>
          <Spacer y={0.3} />
          <Card.Divider height={2} />
          <Spacer y={0.4} />
        </div>
        <div>
          <Text size={15} weight="semibold" color="$gray700">
            Member Prompt ID
          </Text>
          <Text size={18} weight="semibold">
            poiuytrewq
          </Text>
          <Spacer y={0.3} />
          <Card.Divider height={2} />
          <Spacer y={0.4} />
        </div>
        <div>
          <Text size={15} weight="semibold" color="$gray700">
            Creator Name
          </Text>
          <Text size={18} weight="semibold">
            zayn
          </Text>
          <Spacer y={0.3} />
          <Card.Divider height={2} />
          <Spacer y={0.4} />
        </div>
        <div>
          <Text size={15} weight="semibold" color="$gray700">
            Created
          </Text>
          <Text size={18} weight="semibold">
            March 27, 2023, 1:30 PM GMT+7
          </Text>
          <Spacer y={0.3} />
          <Card.Divider height={2} />
          <Spacer y={0.4} />
        </div>
        <div>
          <Text size={15} weight="semibold" color="$gray700">
            Tags
          </Text>
          <Spacer y={0.3} />
          <Grid.Container gap={0.5}>
            {(() => {
              const arr = [];
              for (let i = 0; i < 5; i += 1) {
                arr.push(
                  <Grid key={i}>
                    <Tag name={i.toString()} />
                  </Grid>
                );
              }
              return arr;
            })()}
          </Grid.Container>
          <Spacer y={0.3} />
          <Card.Divider height={2} />
          <Spacer y={0.4} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default ImageInformationCard;
