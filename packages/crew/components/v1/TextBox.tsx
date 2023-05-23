import React from 'react';
import { Textarea } from '@nextui-org/react';

function TextBox(setPrompt: React.Dispatch<React.SetStateAction<string>>) {
  return (
    <Textarea
      width="100%"
      cacheMeasurements={false}
      label="Generate your first beautiful image within seconds. Write your awesome AI prose below to start"
      placeholder="A raccoon that can speak and wield a sword"
      onChange={(e) => setPrompt(e.target.value)}
    />
  );
}

export default TextBox;
