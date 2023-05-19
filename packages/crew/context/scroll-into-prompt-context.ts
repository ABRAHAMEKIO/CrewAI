import { createContext } from 'react';

interface ScrollIntoPromptContextInterface {
  promptId: number;
  setPromptId: (value) => void;
}

const ScrollIntoPromptContext = createContext<ScrollIntoPromptContextInterface>(
  {
    promptId: null,
    setPromptId: () => null,
  }
);

export default ScrollIntoPromptContext;
