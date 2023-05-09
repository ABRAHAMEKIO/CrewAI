/* eslint-disable no-console */
import OpenAIClient, {
  CompletionSuccessResponse,
} from '../../../domain/openai/openAIClient';

const OPENAI_KEY: string = process.env.OPENAI_API_KEY;
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

  const openAiClient = new OpenAIClient(OPENAI_KEY);
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
