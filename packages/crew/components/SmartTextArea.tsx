import React from 'react';
import ContentEditable from 'react-contenteditable';
import styles from './SmartTextArea.module.css';
import OpenAIClient from '../domain/openai/openAIClient';
import useRefCallback from '../hooks/UseRefCallback';

function SmartTextArea(props: {
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  openAIClient: OpenAIClient;
}) {
  const placeholder = 'A raccoon that can speak and wield a sword';
  const placeholderTag = `<span class="placeholder" style="color: #757575;user-select: none;" contenteditable="false">${placeholder}</span>`;
  const contentRef = React.useRef(null);
  const { setPrompt, openAIClient } = props;
  const [input, setInput] = React.useState('');
  const [suggestion, setSuggestion] = React.useState('');
  const [content, setContent] = React.useState(placeholderTag);

  let debounceTimerOnContentChanged;
  const onContentChanged = useRefCallback((e) => {
    clearTimeout(debounceTimerOnContentChanged);
    if (e.currentTarget !== placeholderTag) {
      setContent(e.currentTarget.innerHTML);
      setPrompt(e.currentTarget.innerHTML);

      debounceTimerOnContentChanged = setTimeout(async () => {
        const userInput = e.currentTarget.innerHTML
          .replace(/<span[^>]*>(.*?)<\/span>/gi, '')
          .replaceAll('&nbsp;', ' ');
        if (userInput && userInput !== input) {
          setInput(userInput);
          await openAIClient.completions(userInput).then((response) => {
            if (response?.choices.length > 0) {
              const suggestionResponse = response?.choices[0].text;
              // if (suggestionResponse && suggestionResponse !== suggestion) {
              setSuggestion(suggestionResponse);
              const suggestionTag = `<span class="sug" style="color: #757575;
              user-select: none;" contenteditable="false">${suggestionResponse}</span>`;
              setContent(userInput + suggestionTag);
            }
          });
        }
      }, 500);
    }
  }, []);

  const onKeyDown = useRefCallback(
    (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        const newContent = input + suggestion;
        // content.current = input + suggestion;
        setContent(newContent);
      }
    },
    [content]
  );

  const onBlur = useRefCallback(
    (e) => {
      if (content === '') {
        setContent(placeholderTag);
      }
    },
    [content]
  );

  const onFocus = useRefCallback(
    (e) => {
      if (content.includes(placeholderTag)) {
        setContent('');
      } else if (content === '') {
        setContent(placeholderTag);
      }
    },
    [content]
  );

  return (
    <ContentEditable
      ref={contentRef}
      className={styles.smart_text_area}
      html={content}
      onChange={onContentChanged}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}

export default SmartTextArea;
