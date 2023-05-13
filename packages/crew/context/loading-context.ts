import { createContext } from 'react';

interface LoadingContextInterface {
  loading: boolean;
  setLoading: (value) => void;
}

const LoadingContext = createContext<LoadingContextInterface>({
  loading: false,
  setLoading: () => false,
});

export default LoadingContext;
