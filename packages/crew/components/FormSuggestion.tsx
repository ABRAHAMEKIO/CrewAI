import React, { useEffect, useState } from 'react';
import { Text, Button } from '@nextui-org/react';
import icons from './Icons';

function Tag({
  index,
  tag,
  close,
  handleClick,
}: {
  index: number;
  tag: string;
  close: boolean;
  handleClick: (str: string) => void;
}) {
  return (
    <div
      key={index}
      style={{
        marginRight: '.5rem',
        marginBottom: '.5rem',
        padding: '.2rem .5rem .2rem 1rem',
        background: '#2B2F31',
        borderRadius: '.5rem',
        width: 'fit-content',
        display: 'inline-flex',
        fontSize: '5pt',
        boxShadow:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text size="$xs" color="white" style={{ marginRight: '.5rem' }}>
          {tag}
        </Text>
        <Button
          type="button"
          auto
          rounded={false}
          style={{
            background: 'none',
            width: 'fit-content',
            height: 'fit-content',
          }}
          onPress={() => handleClick(tag)}
          icon={close ? icons.close : icons.plus}
        />
      </div>
    </div>
  );
}

function FormSuggestion({
  suggestions,
  onSelected,
}: {
  suggestions: string[];
  onSelected: (str: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>(suggestions);

  function add(tag) {
    setSelected([...selected, tag]);
    onSelected([...selected, tag]);

    const index = options.indexOf(tag);

    if (index > -1) {
      options.splice(index, 1);
      setOptions([...options]);
    }
  }

  function remove(tag) {
    setOptions([...options, tag]);

    const index = selected.indexOf(tag);

    if (index > -1) {
      selected.splice(index, 1);
      setSelected([...selected]);
      onSelected([...selected]);
    }
  }

  return (
    <div
      style={{
        background: '#16181a',
        borderRadius: '.7rem',
        padding: '2rem',
        minHeight: '50px',
      }}
    >
      <div>
        {selected.length >= 1 && (
          <div
            style={{
              marginBottom: '1.5rem',
            }}
          >
            {selected.map((tag, index) => (
              <Tag
                index={index}
                tag={tag}
                close
                handleClick={(value) => remove(value)}
              />
            ))}
          </div>
        )}

        <Text
          size="$xs"
          style={{
            marginBottom: '1rem',
          }}
        >
          Suggestion:
        </Text>

        {options.map((tag, index) => (
          <Tag
            index={index}
            tag={tag}
            close={false}
            handleClick={(value) => add(value)}
          />
        ))}
      </div>
    </div>
  );
}

export default FormSuggestion;
