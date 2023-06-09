import { ethers, utils } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import Replicate from 'replicate';
import {
  rpcGatewayFmKeyGnosis,
  rpcGatewayFmKeyPolygon,
  web3PromptPrice,
  web3AddressGnosis,
  web3AddressPolygon,
  openjourneyPredictionsVersion,
} from '../../../config';
import Prompt, { ModelType, PromptAttributes } from '../../../db/models/prompt';
import Webhook, { WebhookStep } from '../../../db/models/webhook';
import MidjourneyClient from '../../../domain/midjourney/midjourneyClient';

export interface SuccessResponse {
  success: boolean;
  receipt: TransactionResponse;
}

export interface FailedResponse {
  success: boolean;
  receipt: null;
}

const AUTH_SECRET = process.env.AUTH_SECRET_THENEXTLEG;
const WEBHOOK_OVERRIDE: string = process.env.WEBHOOK_OVERRIDE_THENEXTLEG;

async function generateByOj({
  prompt,
  socketId,
  msg,
  transactionHash,
  creatorAddress,
}: {
  prompt: PromptAttributes;
  socketId: string;
  msg: string;
  transactionHash: string;
  creatorAddress: string;
}) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const prediction = await replicate.predictions.create({
    version: openjourneyPredictionsVersion,
    input: { prompt: msg },
    webhook: WEBHOOK_OVERRIDE,
    webhook_events_filter: ['completed'],
  });

  await Webhook.create({
    prompt: msg,
    extendedPrompt: msg,
    socketId,
    promptId: prompt.id,
    step: WebhookStep.create,
    modelType: ModelType.midJourney,
    replicatemeGenId: prediction.id,
    transactionHash,
    creatorAddress,
  });

  return prediction;
}

async function generateByMj({
  prompt,
  socketId,
  msg,
  transactionHash,
  creatorAddress,
}: {
  prompt: PromptAttributes;
  socketId: string;
  msg: string;
  transactionHash: string;
  creatorAddress: string;
}) {
  const { extendedPrompt } = prompt;
  const searchTerm = '--';
  const indexOfFirst = extendedPrompt.indexOf(searchTerm);
  const promptMessage = `${msg} ${extendedPrompt.slice(indexOfFirst)}`;

  const webhook = await Webhook.create({
    prompt: msg,
    extendedPrompt: promptMessage,
    socketId,
    promptId: prompt.id,
    step: WebhookStep.create,
    modelType: ModelType.midJourney,
    creatorAddress,
    transactionHash,
  });

  const midjourneyClient = new MidjourneyClient(AUTH_SECRET);
  return midjourneyClient.imagine(
    promptMessage,
    webhook.id.toString(),
    WEBHOOK_OVERRIDE
  );
}

export default async function handler(
  req,
  res
): Promise<SuccessResponse | FailedResponse> {
  const {
    body: { transactionHash, promptId, msg, socketId, chainId }, // '0x916ab96e5fb29e836ffcfc52fc95b6d1f35a761c92e0c6b33d6364d79d4f4c80'
  } = req;

  const prompt = await Prompt.findByPk(promptId);

  const { modelType } = prompt;

  const provider = new ethers.providers.JsonRpcProvider(
    chainId === 100 ? rpcGatewayFmKeyGnosis : rpcGatewayFmKeyPolygon
  );

  const tx = await provider.getTransaction(transactionHash);
  const txReceipt = await provider.getTransactionReceipt(transactionHash);

  // check transaction hash is valid with rpc
  if (!tx || !txReceipt) {
    return res
      .status(200)
      .json({ success: false, message: 'Transaction receipt not found' });
  }

  const { to, from } = tx;
  const { status } = txReceipt;

  // Check status transaction
  if (status !== 1) {
    return res
      .status(200)
      .json({ success: false, message: 'Status transaction is not confirmed' });
  }

  // Jumlah yang dibayarkan sudah sesuai dengan harga belum?
  const value = utils.formatUnits(tx.value.toString(), 18);
  console.log({ value, tx, web3PromptPrice });
  if (value !== web3PromptPrice.toString()) {
    return res
      .status(200)
      .json({ success: false, message: 'Payment amount not matched' });
  }

  const webhookByTransaction = await Webhook.findOne({
    where: { transactionHash },
  });

  // transactionHash dipake berapa kali apakah 1? jika lebih maka error
  if (webhookByTransaction) {
    return res
      .status(200)
      .json({ success: false, message: 'Transaction hash used multiple time' });
  }

  // Wallet gnosis (chainId 100) dan polygon (chainId 137)
  if (chainId === 100 && !(to === web3AddressGnosis)) {
    return res
      .status(200)
      .json({ success: false, message: 'Invalid chain id' });
  }

  if (chainId === 137 && !(to === web3AddressPolygon)) {
    return res
      .status(200)
      .json({ success: false, message: 'Invalid chain id' });
  }

  console.log('modelType: ', modelType, modelType === ModelType.midJourney);
  // TODO: implement strategy pattern
  if (modelType === ModelType.midJourney) {
    const imageCommandResponse = await generateByMj({
      prompt,
      socketId,
      msg,
      transactionHash,
      creatorAddress: from,
    });

    // eslint-disable-next-line no-console
    console.log(imageCommandResponse);
    return res.status(200).json({ success: true });
  }

  if (modelType === ModelType.openJourney) {
    const prediction = await generateByOj({
      prompt,
      socketId,
      msg,
      transactionHash,
      creatorAddress: from,
    });

    // eslint-disable-next-line no-console
    console.log(prediction);
    return res.status(200).json({ success: true });
  }

  // validasi
  // jumlah
  // pengirim penerima
  // lalu simpan status seperti di webhook
  return res.status(200).json({
    success: true,
    receipt: tx,
  });
}
