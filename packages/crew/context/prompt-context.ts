import { createContext } from 'react';
import { PromptAttributes } from '../db/models/prompt';

const PromptContext = createContext<PromptAttributes>(null);

export default PromptContext;
