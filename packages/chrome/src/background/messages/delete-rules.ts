import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler<void, void> = async () => {
  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    console.log("This is the rules", rules);
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: rules.map((rule) => rule.id),
      },
      () => {
        console.log("Successfully removed rules");
      },
    );
  });
};

export default handler;
