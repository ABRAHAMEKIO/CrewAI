import { useState } from 'react';
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const useDebouncedCompletion = (completionFunction) => {
  // Handle the input text state
  const [inputText, setInputText] = useState<string>('');

  // Debounce the original search async function
  const debouncedCompletionFunction = useConstant(() =>
    AwesomeDebouncePromise(completionFunction, 300)
  );

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(async () => {
    if (inputText.length === 0) {
      return [];
    }
    return debouncedCompletionFunction(inputText);
  }, [debouncedCompletionFunction, inputText]);

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  };
};

export default useDebouncedCompletion;
