import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  return res.send({
    message: 'pong',
  });
};

export default handler;
