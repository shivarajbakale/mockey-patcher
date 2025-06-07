import type { MockedRequest } from "@/devtool-panels/api-tracker/store/requests";
import type { PlasmoMessaging } from "@plasmohq/messaging";

type Rule = chrome.declarativeNetRequest.Rule;

export function generateRulesFromList(list: MockedRequest[]): Rule[] {
  return list.map((entry) => ({
    id: Number(entry.id),
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: {
        url: `http://localhost:3000/mocks/${entry.id}`,
      },
    },
    condition: {
      urlFilter: entry.url,
      requestMethods: [
        entry.method.toLowerCase() as chrome.declarativeNetRequest.RequestMethod,
      ],
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST],
    },
  }));
}

type EnableMockingRequest = {
  requests: MockedRequest[];
};

type EnableMockingResponse = {
  message: string;
};

const handler: PlasmoMessaging.MessageHandler<
  EnableMockingRequest,
  EnableMockingResponse
> = async (req, res) => {
  const { requests } = req.body;
  const rules = generateRulesFromList(requests);
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: rules,
      removeRuleIds: rules.map((rule) => rule.id),
    },
    () => {
      console.log("Rules updated");
    },
  );

  res.send({
    message: "pong",
  });
};

export default handler;
