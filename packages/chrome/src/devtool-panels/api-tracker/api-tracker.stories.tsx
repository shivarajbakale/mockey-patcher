import type { Meta, StoryObj } from "@storybook/react";
import { Main } from "./components/main";
import { RequestItem } from "./components/RequestItem";
import React from "react";

const meta: Meta<typeof Main> = {
  title: "Devtools/APITracker",
  component: Main,
};

export default meta;

export const RequestItemStory: StoryObj<typeof RequestItem> = {
  args: {
    request: {
      url: "https://api.example.com/data",
      method: "GET",
      status: 200,
      duration: 100,
      responseBody: "Response body",
      requestBody: "Request body",
      numberOfBytes: 100,
      id: "1",
    },
  },
  render: (args) => <RequestItem {...args} />,
};
