import type { RequestMetadata } from "../api-tracker";

const BACKEND_URL = "http://localhost:3000";

export const sendMockRequests = async (requests: RequestMetadata[]) => {
  console.log("These are the requests", requests);
  try {
    await fetch(`${BACKEND_URL}/requests/create`, {
      method: "POST",
      body: JSON.stringify(requests),
    });
  } catch (error) {
    console.error("Error sending mock requests", error);
  }
};
