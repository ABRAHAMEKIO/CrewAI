import React, { createContext } from 'react';

interface ErrorModalContextInterface {
  modalOpen: boolean;
  setModalOpen: (value) => void;
  title: string;
  setTitle: (value) => void;
  message: string;
  setMessage: (value) => void;
  icon: JSX.Element;
  setIcon: (value) => void;
}

const ErrorModalContext = createContext<ErrorModalContextInterface>({
  modalOpen: null,
  setModalOpen: () => null,
  title: null,
  setTitle: () => null,
  message: null,
  setMessage: () => null,
  icon: null,
  setIcon: () => null,
});

export default ErrorModalContext;
