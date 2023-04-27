/* eslint-disable no-console */
import OpenAIClient, {
  CompletionSuccessResponse,
} from '../../../domain/openai/openAIClient';

// eslint-disable-next-line prefer-destructuring
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export default async function handler(
  req,
  res
): Promise<CompletionSuccessResponse> {
  const {
    body: {
      prompt,
      model,
      maxTokens,
      temperature,
      topP,
      n,
      stream,
      logprob,
      stop,
    },
  } = req;

  // console.log('server log:');
  // console.log(req.body);
  // console.log({
  //   prompt,
  //   model,
  //   maxTokens,
  //   temperature,
  //   topP,
  //   n,
  //   stream,
  //   logprob,
  //   stop,
  // });
  // console.log(prompt);

  const openAiClient = new OpenAIClient(OPENAI_API_KEY);
  const response = await openAiClient.completions(
    prompt,
    model,
    maxTokens,
    temperature,
    topP,
    n,
    stream,
    logprob || null,
    stop
  );
  return res.status(200).json(response);
}
