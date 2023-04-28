export default function bracketsRecognize(promptText: string) {
  const paramsCollections = [];
  const tempIndexParams = [];
  const stack = [];
  let invalidFormat = false;

  for (let i = 0; i < promptText.length; i += 1) {
    const x0 = promptText[i];
    const x1 = promptText[i + 1];

    if (x0 === '{' && x1 === '{') {
      stack.push('{{');
      tempIndexParams.pop();
      tempIndexParams.push(i + 2);
    } else if (x0 === '}' && x1 === '}' && stack[stack.length - 1] === '{{') {
      stack.pop();
      tempIndexParams.push(i);

      // slicing to get words
      const words = promptText.slice(tempIndexParams[0], tempIndexParams[1]);

      // format words in brackets cannot contains space
      if (words.includes(' ')) {
        invalidFormat = true;
      } else {
        invalidFormat = false;
        paramsCollections.push(words);

        // reset temp index after words were obtained
        tempIndexParams.length = 0;
      }
    }
  }

  if (invalidFormat === true) {
    return { data: null };
  }

  return { data: paramsCollections };
}
