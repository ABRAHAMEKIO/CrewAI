import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { Textarea } from '@nextui-org/react';
import styles from './AutoCompleteTextarea.module.css';
import OpenAIClient, {
  CompletionSuccessResponse,
} from '../domain/openai/openAIClient';

const suggestions = [
  'apple',
  'banana',
  'cherry',
  'date',
  'elderberry',
  'fig',
  'grapefruit',
  'honeydew',
  'indian gooseberry',
  'jackfruit',
  'kiwi',
  'lemon',
  'mango',
  'nectarine',
  'orange',
  'peach',
  'quince',
  'raspberry',
  'strawberry',
  'tangerine',
  'ugli fruit',
  'vanilla bean',
  'watermelon',
  'xigua (Chinese watermelon)',
  'yellow watermelon',
  'zucchini',
];

function AutoCompleteTextarea(props: {
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  openAIClient: OpenAIClient;
}) {
  const { setPrompt, openAIClient } = props;
  const [value, setValue] = useState('');
  const [suggestionsList, setSuggestionsList] = useState([]);

  // const debouncedApiCall = useMemo(
  //   debounce((text) => {
  //     return ['aaa'];
  //   }, 1000), [])

  // useEffect(() => {
  //   debouncedApiCall(value);
  // }, [value, debouncedApiCall]);

  // useEffect(() => {
  //   const debounceTimer = setTimeout(async () => {
  //     console.log('Performing search with', value);
  //     if (value) {
  //       await openAIClient.completions(value).then((response) => {
  //         console.log('client response:');
  //         console.log(response.choices);
  //         if (response?.choices.length > 0) {
  //           setSuggestionsList(response.choices.map((e) => e.text));
  //         }
  //       });
  //     }
  //   }, 500);

  //   return () => clearTimeout(debounceTimer);
  // }, [value, openAIClient]);

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const getSuggestions = (val) => {
    if (val) {
      console.log(val);
      const inputValue = val.trim().toLowerCase();
      const inputLength = inputValue.length;
      console.log(inputLength);
      console.log(
        suggestions.filter(
          (item) => item.toLowerCase().slice(0, inputLength) === inputValue
        )
      );

      return inputLength === 0
        ? []
        : suggestions.filter(
            (item) => item.toLowerCase().slice(0, inputLength) === inputValue
          );
    }
    return [];
  };

  let debounceTimer;
  const fetchSuggestions = () => {
    debounceTimer = setTimeout(async () => {
      console.log('Performing search with', value);
      if (value) {
        await openAIClient.completions(value).then((response) => {
          console.log('client response:');
          console.log(response);
          if (response?.choices.length > 0) {
            setSuggestionsList(response.choices.map((e) => e.text));
          }
        });
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  };

  const onChange = async (event, { newValue }) => {
    setValue(newValue);
    // getSuggestions(newValue);
    // setSuggestionsList(getSuggestions(newValue));
    setPrompt(newValue);
    fetchSuggestions();
  };

  const onSuggestionsFetchRequested = ({ val }) => {
    // console.log({ val });
    // setSuggestionsList(getSuggestions(val));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const shouldRenderSuggestions = () => true;

  const onSuggestionSelected = (event, { suggestionValue }) => {
    setValue(value + suggestionValue);
    setPrompt(value);
  };

  const inputProps = {
    placeholder: 'A raccoon that can speak and wield a sword',
    value,
    onChange,
    textarea: true,
    // component: Textarea,
  };

  /* eslint-disable react/jsx-props-no-spreading */
  const renderInputComponent = (textareaProps) => (
    <div>
      {/* <input {...textareaProps} /> */}
      <Textarea width="100%" {...textareaProps} />
    </div>
  );

  return (
    <Autosuggest
      suggestions={suggestionsList}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <div>{suggestion}</div>}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
      shouldRenderSuggestions={shouldRenderSuggestions}
      onSuggestionSelected={onSuggestionSelected}
      theme={styles}
    />
  );
}

export default AutoCompleteTextarea;
