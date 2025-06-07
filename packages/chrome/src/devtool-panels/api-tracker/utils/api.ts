import type { RequestMetadata } from "../api-tracker";

const BACKEND_URL = "http://localhost:3000";

export const sendMockRequests = async (requests: RequestMetadata[]) => {
  try {
    const response = await fetch(`${BACKEND_URL}/requests/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests }),
    });
    const data = await response.json();
    return data.requests;
  } catch (error) {
    console.error("Error sending mock requests", error);
  }
};

export const getMockedRequests = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/requests/get-all`);
    const data = await response.json();

    return data.requests;
  } catch (error) {
    console.error("Error getting mocked requests", error);
  }
};

export const deleteAllMocks = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/requests/delete-all`, {
      method: "delete",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting all mocks", error);
  }
};

export const fetchMock = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/mocks/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching mock", error);
  }
};

export const updateMock = async (id: string, responseBody: object) => {
  try {
    const response = await fetch(`${BACKEND_URL}/mocks/update/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ responseBody }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating mock", error);
  }
};

export const deleteMock = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/mocks/delete/${id}`, {
      method: "delete",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting mock", error);
  }
};
