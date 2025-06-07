import type { PlasmoMessaging } from "@plasmohq/messaging";

type PingRequest = {
  message: string;
};

type PingResponse = {
  message: string;
};

const handler: PlasmoMessaging.MessageHandler<
  PingRequest,
  PingResponse
> = async (req, res) => {
  res.send({
    message: "pong",
  });
};

export default handler;
