import { createContext } from 'react';

interface NavNewPromptContextInterface {
  promptId: number;
  setPromptId: (value) => void;
  indicatorNewPromptDisplay: boolean;
  setIndicatorNewPromptDisplay: (value) => void;
}

const NavNewPromptContext = createContext<NavNewPromptContextInterface>({
  promptId: null,
  setPromptId: () => null,
  indicatorNewPromptDisplay: false,
  setIndicatorNewPromptDisplay: () => null,
});

export default NavNewPromptContext;
