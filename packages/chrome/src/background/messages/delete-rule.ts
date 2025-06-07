import type { PlasmoMessaging } from "@plasmohq/messaging";

interface DeleteRulePayload {
  id: number;
}

const handler: PlasmoMessaging.MessageHandler<
  DeleteRulePayload,
  void
> = async ({ body }) => {
  console.log("Deleting rule", body.id);
  if (!body.id) {
    console.error("No id provided");
    return;
  }
  chrome.declarativeNetRequest.getDynamicRules(() => {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: [body.id],
      },
      () => {
        console.log("Successfully removed rule");
      },
    );
  });
};

export default handler;
