import type { PlasmoMessaging } from '@plasmohq/messaging';

type PingRequest = {
  message: string;
};

type PingResponse = {
  message: string;
};

const handler: PlasmoMessaging.MessageHandler<PingRequest, PingResponse> = async (req, res) => {
  console.log('Background received:', req.body); // Add logging to verify handler is triggered
  res.send({
    message: 'pong',
  });
};

export default handler;
