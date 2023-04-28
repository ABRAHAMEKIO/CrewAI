import { Input, Text, Tooltip, Grid } from '@nextui-org/react';
import React from 'react';
import Handlebars from 'handlebars/dist/cjs/handlebars';

function ParametersFromPrompt(props: {
  prompt: string;
  params: Array<string>;
  paramsData: object;
  finalPrompt: (value: string) => void;
}): JSX.Element {
  const { prompt, params, paramsData, finalPrompt } = props;

  function handleChangeInputParams(value: Array<string>) {
    const paramsKey = value[0];
    const paramsValue = value[1];

    paramsData[paramsKey] = paramsValue;

    const promptTemplate = Handlebars.compile(prompt);
    const result = promptTemplate(paramsData);

    finalPrompt(result);
  }

  function handleBlurInputParams(value: Array<string>) {
    const paramsKey = value[0];
    const paramsValue = value[1];

    if (paramsValue.length < 1) {
      paramsData[paramsKey] = '...';
    }

    const promptTemplate = Handlebars.compile(prompt);
    const result = promptTemplate(paramsData);

    finalPrompt(result);
  }
  return (
    <>
      {params.map((item) => (
        <Grid.Container gap={1} justify="space-between" key={item}>
          <Grid xs={4}>
            <Tooltip content={item} placement="top" color="secondary">
              <Text
                css={{
                  my: 10,
                  textGradient: '45deg, $purple600 -20%, $pink600 100%',
                  maxWidth: '6em',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {item}
              </Text>
            </Tooltip>
          </Grid>
          <Grid xs={8}>
            <Input
              clearable
              aria-label={item}
              value={paramsData[item]}
              placeholder="..."
              fullWidth
              onChange={(e) =>
                handleChangeInputParams([e.target.ariaLabel, e.target.value])
              }
              onBlur={(e) =>
                handleBlurInputParams([e.target.ariaLabel, e.target.value])
              }
            />
          </Grid>
        </Grid.Container>
      ))}
    </>
  );
}

export default ParametersFromPrompt;
