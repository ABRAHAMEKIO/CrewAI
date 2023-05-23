import React from 'react';
import ContentEditable from 'react-contenteditable';
import styles from './SmartTextArea.module.css';
import OpenAIClient from '../../domain/openai/openAIClient';
import useRefCallback from '../../hooks/UseRefCallback';

function SmartTextArea(props: {
  onContentChange: (value: string) => void;
  onContentBlur: (value: string) => void;
  onContentFocus: () => void;
  openAIClient: OpenAIClient;
}) {
  const placeholder = 'A raccoon that can speak and wield a sword';
  const placeholderTag = `<span class="placeholder" style="color: #757575;user-select: none;" contenteditable="false">${placeholder}</span>`;
  const contentRef = React.useRef(null);
  const { onContentChange, onContentBlur, onContentFocus, openAIClient } =
    props;
  const [input, setInput] = React.useState('');
  const [suggestion, setSuggestion] = React.useState('');
  const [content, setContent] = React.useState(placeholderTag);
  const [plainContent, setPlainContent] = React.useState('');

  const changeContent = (plain, rich) => {
    setContent(rich);
    setPlainContent(plain);
  };
  const fullContent = () => plainContent + suggestion;

  let debounceTimerOnContentChanged;
  const onChanged = useRefCallback((e) => {
    clearTimeout(debounceTimerOnContentChanged);
    if (e.currentTarget !== placeholderTag) {
      const newPlainContent = e.target.value
        ? e.target.value.replace('&nbsp;', ' ')
        : '';
      changeContent(newPlainContent, e.currentTarget.innerHTML);
      onContentChange(newPlainContent);

      debounceTimerOnContentChanged = setTimeout(async () => {
        const userInput = e.currentTarget.innerHTML
          .replace(/<span[^>]*>(.*?)<\/span>/gi, '')
          .replaceAll('&nbsp;', ' ');
        if (userInput && userInput !== input) {
          setInput(userInput);
          const response = await openAIClient.completions(userInput);
          if (response?.choices.length > 0) {
            const suggestionResponse = response?.choices[0].text;
            setSuggestion(suggestionResponse);
            const suggestionTag = `<span class="sug" style="color: #757575;
            user-select: none;" contenteditable="false">${suggestionResponse}</span>`;
            changeContent(
              plainContent + suggestionResponse,
              userInput + suggestionTag
            );
          }
        }
      }, 2000);
    }
  }, []);

  const onKeyDown = useRefCallback(
    (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        const newContent = input + suggestion;
        changeContent(plainContent + suggestion, newContent);
        onContentChange(plainContent + suggestion);
      }
    },
    [content]
  );

  const onBlur = useRefCallback(
    (e) => {
      const userInput = content
        .replace(/<span[^>]*>(.*?)<\/span>/gi, '')
        .replace('&nbsp;', ' ');
      setInput(content);
      onContentBlur(content);
      if (content === '') {
        changeContent('', placeholderTag);
      }
    },
    [content]
  );

  const onFocus = useRefCallback(
    (e) => {
      onContentFocus();
      if (content.includes(placeholderTag)) {
        changeContent('', '');
      } else if (content === '') {
        changeContent('', '');
      }
    },
    [content]
  );

  return (
    <div className={styles.textarea_container}>
      <ContentEditable
        ref={contentRef}
        className={styles.smart_text_area}
        html={content}
        onChange={onChanged}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
}

export default SmartTextArea;
